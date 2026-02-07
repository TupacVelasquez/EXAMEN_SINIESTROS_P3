import { useEffect } from 'react';
import './Notification.css';

const Notification = ({ notifications, onRemove }) => {
    useEffect(() => {
        const timers = notifications.map((notif) => {
            if (notif.autoClose !== false) {
                return setTimeout(() => {
                    onRemove(notif.id);
                }, 4000);
            }
            return null;
        });

        return () => {
            timers.forEach((timer) => {
                if (timer) clearTimeout(timer);
            });
        };
    }, [notifications, onRemove]);

    if (notifications.length === 0) return null;

    return (
        <div className="notification-container">
            {notifications.map((notif) => (
                <div key={notif.id} className={`notification ${notif.type}`}>
                    <span className="icon">
                        {notif.type === 'success' ? '✓' : '✕'}
                    </span>
                    <span className="message">{notif.message}</span>
                    <button
                        className="close-btn"
                        onClick={() => onRemove(notif.id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;
