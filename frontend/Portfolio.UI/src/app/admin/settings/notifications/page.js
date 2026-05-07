"use client";

import { useState } from "react";
import classes from "./Notifications.module.css";
import Button from "@/app/components/Button/Button";
import { MessageSquare, ShieldAlert, Mail } from "lucide-react";

export default function Notifications() {
  const [prefs, setPrefs] = useState({
    newMessages: true,
    loginAlerts: true,
    dailyDigest: false,
  });

  const handleToggle = (name) => {
    setPrefs((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={classes.div}>
      <h1 className={classes.pageTitle}>Notification Preferences</h1>
      <div className={classes.settingsContainer}>
        <div className={classes.settingBlock}>
          <div className={classes.blockInfo}>
            <h3>
              <MessageSquare size={20} className={classes.icon} /> Messages
            </h3>
            <p>
              Control how you are notified when someone contacts you through
              your portfolio.
            </p>
          </div>
          <div className={classes.blockForm}>
            <div className={classes.toggleRow}>
              <div>
                <h4>New Message Alerts</h4>
                <p>
                  Receive an email instantly when a new message is submitted.
                </p>
              </div>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  checked={prefs.newMessages}
                  onChange={() => handleToggle("newMessages")}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
          </div>
        </div>
        <div className={classes.settingBlock}>
          <div className={classes.blockInfo}>
            <h3>
              <ShieldAlert size={20} className={classes.icon} /> Security Alerts
            </h3>
            <p>
              Get notified about important security events related to your admin
              account.
            </p>
          </div>
          <div className={classes.blockForm}>
            <div className={classes.toggleRow}>
              <div>
                <h4>Unrecognized Logins</h4>
                <p>Email me if a login occurs from a new device or browser.</p>
              </div>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  checked={prefs.loginAlerts}
                  onChange={() => handleToggle("loginAlerts")}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
          </div>
        </div>
        <div className={classes.settingBlock}>
          <div className={classes.blockInfo}>
            <h3>
              <Mail size={20} className={classes.icon} /> Email Digest
            </h3>
            <p>Reduce inbox clutter by receiving bundled notifications.</p>
          </div>
          <div className={classes.blockForm}>
            <div className={classes.toggleRow}>
              <div>
                <h4>Daily Summary</h4>
                <p>
                  Send me a single email at the end of the day with all new
                  messages and activities.
                </p>
              </div>
              <label className={classes.switch}>
                <input
                  type="checkbox"
                  checked={prefs.dailyDigest}
                  onChange={() => handleToggle("dailyDigest")}
                />
                <span className={classes.slider}></span>
              </label>
            </div>
            <div className={classes.submitContainer}>
              <Button type="button">Save Preferences</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
