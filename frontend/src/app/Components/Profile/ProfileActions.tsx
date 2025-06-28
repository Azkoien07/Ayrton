import React from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Edit2, X } from 'lucide-react';

interface ProfileActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <div className="flex gap-2">
      {isEditing ? (
        <>
          <motion.button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-light-border font-medium text-light-textSecondary transition-colors duration-200 hover:bg-light-accentSoft"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <X size={16} className="inline mr-2" />
            Cancelar
          </motion.button>
          
          <motion.button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-light-primary text-white font-medium transition-all duration-200 disabled:opacity-50 hover:bg-opacity-90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="inline mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={16} className="inline mr-2" />
                Guardar
              </>
            )}
          </motion.button>
        </>
      ) : (
        <motion.button
          onClick={onEdit}
          className="px-4 py-2 rounded-lg bg-light-primary text-white font-medium transition-all duration-200 hover:bg-opacity-90"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit2 size={16} className="inline mr-2" />
          Editar Perfil
        </motion.button>
      )}
    </div>
  );
};

export default ProfileActions;
