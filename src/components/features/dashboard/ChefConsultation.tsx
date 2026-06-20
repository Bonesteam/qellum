"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { FaUserClock, FaVideo, FaComments, FaCalendarAlt, FaStar, FaCrown, FaCheckCircle, FaLock } from "react-icons/fa";
import styles from "./ChefConsultation.module.scss";

interface Message {
    sender: "user" | "chef";
    text: string;
    time: string;
}

const PRESET_CHEF_RESPONSES = [
    "Bonjour! That is a great culinary question. To make the quinoa bowl more flavorful, try roasting the grains in a dry pan for 2 minutes before boiling. Let me know if you would like me to swap that ingredient in your active plan!",
    "Ah, yes! For replacing dairy in the morning smoothies, coconut yogurt or unsweetened almond milk are excellent choices. I have updated your allergen profile in my notes.",
    "Excellent choice! When prepping the Herb Roasted Chicken, make sure to let it rest for 5-7 minutes after baking. This keeps the juices locked in. Would you like me to add a custom lemon-herb dressing recipe for your next week plan?",
    "Perfect macro balance! Since you are hitting the gym in the evening, try shifting 15g of carbs from lunch to your pre-workout snack. I can recalculate the exact meal portions for you if you'd like."
];

export default function ChefConsultation() {
    const user = useUser();
    const [simulateVip, setSimulateVip] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState<"chat" | "booking">("chat");
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "chef",
            text: `Bonjour ${user?.firstName || "there"}! I am Chef Jean-Pierre, your dedicated Qellum executive chef. How can I help you refine your menu or improve your cooking techniques today?`,
            time: "10:00 AM"
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const isActualVip = (user?.tokens ?? 0) >= 49000 || user?.role === "admin";
    const isVip = isActualVip || simulateVip;

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMsg: Message = {
            sender: "user",
            text: inputText,
            time: timeString
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        // Chef responds after a short delay
        setTimeout(() => {
            setIsTyping(false);
            const randomResponse = PRESET_CHEF_RESPONSES[Math.floor(Math.random() * PRESET_CHEF_RESPONSES.length)];
            const chefMsg: Message = {
                sender: "chef",
                text: randomResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, chefMsg]);
        }, 1500);
    };

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingDate || !bookingTime) return;

        const slot = `${bookingDate} at ${bookingTime}`;
        setBookedSlots((prev) => [...prev, slot]);
        setBookingSuccess(true);
        setBookingDate("");
        setBookingTime("");

        setTimeout(() => {
            setBookingSuccess(false);
        }, 5000);
    };

    if (!user) {
        return (
            <div className={styles.noUser}>
                <FaLock size={48} className={styles.lockIcon} />
                <h3>Sign in Required</h3>
                <p>Please sign in to access your personal chef consultations and plans.</p>
                <a href="/sign-in" className={styles.loginBtn}>Sign In</a>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Developer controls */}
            {!isActualVip && (
                <div className={styles.devBar}>
                    <span>🔧 Developer Tools:</span>
                    <label className={styles.switchLabel}>
                        <input
                            type="checkbox"
                            checked={simulateVip}
                            onChange={(e) => setSimulateVip(e.target.checked)}
                        />
                        Simulate VIP Account
                    </label>
                    <span className={styles.devNote}>(Allows testing both regular and VIP tab states)</span>
                </div>
            )}

            {isVip ? (
                <div className={styles.vipInner}>
                    {/* VIP Header Banner */}
                    <div className={styles.vipBanner}>
                        <div className={styles.vipBannerLeft}>
                            <FaCrown className={styles.crownIcon} />
                            <div>
                                <h2 className={styles.vipTitle}>Qellum VIP Chef Retention Lounge</h2>
                                <p className={styles.vipSubtitle}>
                                    Direct access to Chef Jean-Pierre Dubois & Senior Nutritionist Sarah Jenkins
                                </p>
                            </div>
                        </div>
                        <div className={styles.vipBadge}>VIP Elite Active</div>
                    </div>

                    {/* Navigation bar for SubTabs */}
                    <div className={styles.subTabNav}>
                        <button
                            className={`${styles.subTabButton} ${activeSubTab === "chat" ? styles.active : ""}`}
                            onClick={() => setActiveSubTab("chat")}
                        >
                            <FaComments /> Chef Chat Messenger
                        </button>
                        <button
                            className={`${styles.subTabButton} ${activeSubTab === "booking" ? styles.active : ""}`}
                            onClick={() => setActiveSubTab("booking")}
                        >
                            <FaCalendarAlt /> Book Zoom Lesson
                        </button>
                    </div>

                    {/* Chat view */}
                    {activeSubTab === "chat" && (
                        <div className={styles.chatView}>
                            <div className={styles.chefProfileSummary}>
                                <div className={styles.chefAvatarWrapper}>
                                    <div className={styles.chefOnlineDot} />
                                    <span className={styles.chefAvatarEmoji}>👨‍🍳</span>
                                </div>
                                <div>
                                    <h4 className={styles.chefName}>Chef Jean-Pierre Dubois</h4>
                                    <p className={styles.chefBio}>
                                        Executive Chef · 15+ years in Michelin restaurants · French & Mediterranean specialist
                                    </p>
                                </div>
                            </div>

                            <div className={styles.chatMessages}>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.messageRow} ${
                                            msg.sender === "user" ? styles.msgUser : styles.msgChef
                                        }`}
                                    >
                                        {msg.sender === "chef" && (
                                            <span className={styles.msgAvatar}>👨‍🍳</span>
                                        )}
                                        <div className={styles.messageBubble}>
                                            <p className={styles.messageText}>{msg.text}</p>
                                            <span className={styles.messageTime}>{msg.time}</span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className={`${styles.messageRow} ${styles.msgChef}`}>
                                        <span className={styles.msgAvatar}>👨‍🍳</span>
                                        <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                                            <div className={styles.typingIndicator}>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} className={styles.chatInputForm}>
                                <input
                                    type="text"
                                    placeholder="Type a cooking question, swap request, or ingredient advice..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className={styles.chatInput}
                                    disabled={isTyping}
                                />
                                <button type="submit" className={styles.sendBtn} disabled={!inputText.trim() || isTyping}>
                                    Send
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Booking view */}
                    {activeSubTab === "booking" && (
                        <div className={styles.bookingView}>
                            <div className={styles.bookingIntro}>
                                <FaVideo className={styles.videoIcon} />
                                <div>
                                    <h3>VIP 1-on-1 Cooking Session & Kitchen Audit</h3>
                                    <p>
                                        Schedule your monthly 60-minute interactive culinary lesson or dietitian consultation via Zoom. 
                                        Cook side-by-side with Chef Jean-Pierre or align your macro targets with Sarah.
                                    </p>
                                </div>
                            </div>

                            {bookingSuccess && (
                                <div className={styles.alertSuccess}>
                                    <FaCheckCircle className={styles.checkIcon} />
                                    <div>
                                        <strong>Booking Confirmed!</strong> A calendar invitation and Zoom meeting link have been sent to <strong>{user.email}</strong>.
                                    </div>
                                </div>
                            )}

                            <div className={styles.bookingLayout}>
                                <form onSubmit={handleBooking} className={styles.bookingForm}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="date">Select Date:</label>
                                        <input
                                            type="date"
                                            id="date"
                                            required
                                            min={new Date().toISOString().slice(0, 10)}
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="time">Select Time Slot:</label>
                                        <select
                                            id="time"
                                            required
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                        >
                                            <option value="">-- Choose time --</option>
                                            <option value="10:00 AM">10:00 AM (CET)</option>
                                            <option value="01:00 PM">01:00 PM (CET)</option>
                                            <option value="03:30 PM">03:30 PM (CET)</option>
                                            <option value="06:00 PM">06:00 PM (CET)</option>
                                        </select>
                                    </div>

                                    <button type="submit" className={styles.submitBookingBtn}>
                                        Schedule Appointment
                                    </button>
                                </form>

                                <div className={styles.bookedSlotsCard}>
                                    <h4>Your Scheduled Appointments</h4>
                                    {bookedSlots.length === 0 ? (
                                        <p className={styles.noBookings}>No appointments scheduled yet. Select a date above to book.</p>
                                    ) : (
                                        <ul className={styles.bookingsList}>
                                            {bookedSlots.map((slot, i) => (
                                                <li key={i} className={styles.bookingItem}>
                                                    <FaCheckCircle className={styles.bookingCheck} />
                                                    <span>Zoom 1-on-1 Lesson: <strong>{slot}</strong></span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* Non-VIP locks view */
                <div className={styles.lockView}>
                    <div className={styles.lockHeader}>
                        <div className={styles.lockCrownWrap}>
                            <FaCrown className={styles.lockCrown} />
                        </div>
                        <h3>Unlock VIP Private Chef Services</h3>
                        <p className={styles.lockSubtitle}>
                            Get direct WhatsApp support, personalized weekly culinary evaluations, kitchen audits, and live Zoom cooking lessons.
                        </p>
                    </div>

                    <div className={styles.planFeatureGrid}>
                        <div className={styles.featureCard}>
                            <FaComments className={styles.featIcon} />
                            <h5>1-on-1 Chef Chat</h5>
                            <p>Ask cooking advice, swap ingredients, and edit your active recipe plans in real-time.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <FaVideo className={styles.featIcon} />
                            <h5>Zoom Cooking Lessons</h5>
                            <p>Cook live with executive chefs who guide your culinary skills and review your kitchen setup.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <FaUserClock className={styles.featIcon} />
                            <h5>Senior Nutritionist Audit</h5>
                            <p>Get your diet plan board-certified by a licensed dietitian with signature-signed official PDFs.</p>
                        </div>
                    </div>

                    <div className={styles.lockPricingSection}>
                        <h4 className={styles.lockUpgradeTitle}>Choose a VIP Retention Package</h4>
                        <div className={styles.lockGrid}>
                            <div className={styles.upgradeCard}>
                                <span className={styles.upgradeBadge}>VIP Elite</span>
                                <h4 className={styles.upgradeTitle}>VIP Chef Retainer (3 Months)</h4>
                                <div className={styles.upgradePrice}>
                                    <span className={styles.upgradePriceVal}>€499</span>
                                    <span className={styles.upgradePriceLabel}> / One-time</span>
                                </div>
                                <p className={styles.upgradeDesc}>Includes 3 months of private chef access, Zoom lessons, and custom recipes.</p>
                                <a href="/pricing" className={styles.upgradeBtn}>Unlock VIP Elite</a>
                            </div>

                            <div className={`${styles.upgradeCard} ${styles.upgradeCardPremium}`}>
                                <span className={styles.upgradeBadge}>Ultimate VIP</span>
                                <h4 className={styles.upgradeTitle}>Ultimate Culinary Suite (6 Months)</h4>
                                <div className={styles.upgradePrice}>
                                    <span className={styles.upgradePriceVal}>€999</span>
                                    <span className={styles.upgradePriceLabel}> / One-time</span>
                                </div>
                                <p className={styles.upgradeDesc}>Complete 6-month elite transition with chef retainer + senior nutritionist laboratory review.</p>
                                <a href="/pricing" className={`${styles.upgradeBtn} ${styles.upgradeBtnPremium}`}>Unlock Ultimate VIP</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
