"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, X } from 'lucide-react';

type NotificationProps = {
  notification: { show: boolean; message: string; type: 'success' | 'error' };
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show, onClose]);

  if (!notification.show) return null;

  const bgColorClass = notification.type === 'success' ? 'bg-light-success' : 'bg-light-error';
  const Icon = notification.type === 'success' ? CheckCircle : AlertCircle;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white z-50 ${bgColorClass}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
      >
        <Icon size={20} />
        <span className="font-medium">{notification.message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70">
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
