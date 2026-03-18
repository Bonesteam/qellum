// Export an object where keys are collection names and values are functions
// that receive a document and must return the transformed document.
// You can provide collection-specific transformers (e.g. `users`) or a
// global transformer under the key `'*'` which will be applied to every doc.
//
// Address splitting heuristic implemented below will try to split a single
// `address` string into `street`, `city`, `country`, `postalCode`.
// Forbidden countries are excluded from the dropdown list.

const FORBIDDEN_COUNTRIES = ['russia', 'belarus', 'iran', 'north korea'];

function splitAddress(address) {
  if (!address || typeof address !== 'string') return {};
  const parts = address.split(',').map(p => p.trim()).filter(Boolean);
  let street = '';
  let city = '';
  let country = '';
  let postalCode = '';

  if (parts.length >= 4) {
    street = parts.slice(0, parts.length - 3 + 1).join(', ');
    street = parts[0];
    city = parts[1];
    country = parts[2];
    postalCode = parts.slice(3).join(', ');
  } else if (parts.length === 3) {
    street = parts[0];
    city = parts[1];
    const last = parts[2];
    const pcMatch = last.match(/(\d{4,10})$/);
    if (pcMatch) {
      postalCode = pcMatch[1];
      country = last.replace(pcMatch[0], '').trim();
    } else {
      country = last;
    }
  } else if (parts.length === 2) {
    street = parts[0];
    const last = parts[1];
    const pcMatch = last.match(/(\d{4,10})$/);
    if (pcMatch) {
      postalCode = pcMatch[1];
      const maybeCountry = last.replace(pcMatch[0], '').trim();
      // if remaining contains spaces, assume it's "City Country" -> split
      const sp = maybeCountry.split(' ').filter(Boolean);
      if (sp.length >= 2) {
        city = sp.slice(0, sp.length - 1).join(' ');
        country = sp[sp.length - 1];
      } else {
        city = maybeCountry;
      }
    } else {
      city = last;
    }
  } else {
    street = address;
  }

  if (country) {
    const norm = country.toLowerCase();
    if (FORBIDDEN_COUNTRIES.includes(norm)) {
      // exclude forbidden country values
      country = null;
    }
  }

  const out = {};
  if (street) out.street = street;
  if (city) out.city = city;
  if (country !== undefined) out.country = country;
  if (postalCode) out.postalCode = postalCode;
  return out;
}

module.exports = {
  // Global transformer applied to every document
  '*': doc => {
    if (!doc) return doc;
    // If doc already has the split fields, skip
    if (doc.street || doc.city || doc.country || doc.postalCode) return doc;

    // Try common field names
    const addressField = doc.address || doc.addr || doc.location || '';
    if (typeof addressField === 'string' && addressField.trim()) {
      const split = splitAddress(addressField);
      Object.assign(doc, split);
      // optionally remove the original address field if desired
      // delete doc.address;
    }

    return doc;
  },

  // Example collection-specific transform (uncomment and adapt if needed)
  // users: doc => ({ ...doc, migratedAt: new Date() }),
};

