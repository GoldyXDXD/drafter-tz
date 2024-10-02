import React, { useState } from 'react';
import styles from './FormViewer.module.css';

interface FormField {
    id: number;
    label: string;
    type: 'text' | 'checkbox' | 'select';
    options?: string[];
}

const FormViewer: React.FC = () => {
    const [formFields, setFormFields] = useState<FormField[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setFileError('Файл не выбран');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                if (Array.isArray(json)) {
                    setFormFields(json);
                    setFileError(null);
                } else {
                    setFileError('Некорректный формат JSON');
                }
            } catch (error) {
                setFileError('Ошибка при чтении JSON-файла');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={styles.container}>
            <h2>Загрузка и просмотр формы</h2>
            <input type="file" accept=".json" onChange={handleFileUpload} />
            {fileError && <p className={styles.error}>{fileError}</p>}
            {formFields.length > 0 && (
                <form className={styles.form}>
                    {formFields.map((field) => (
                        <div key={field.id} className={styles.formGroup}>
                            <label>{field.label}</label>
                            {field.type === 'text' && <input type="text" placeholder="Введите текст" />}
                            {field.type === 'checkbox' && <div className={styles.checkbox}>Подтверждение<input type="checkbox" /></div>}
                            {field.type === 'select' && (
                                <select>
                                    {field.options?.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </form>
            )}
        </div>
    );
};

export default FormViewer;
