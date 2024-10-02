import React, { useState } from 'react';
import styles from './FormBuilder.module.css';

interface FormField {
    id: number;
    label: string;
    type: 'text' | 'checkbox' | 'select';
    options?: string[];
}

const FormBuilder: React.FC = () => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [label, setLabel] = useState('');
    const [type, setType] = useState<'text' | 'checkbox' | 'select'>('text');
    const [options, setOptions] = useState<string[]>([]);
    const [editingFieldIndex, setEditingFieldIndex] = useState<number | null>(null);


    const addField = () => {
        const newField: FormField = {
            id: Date.now(),
            label,
            type,
            options: type === 'select' ? options : undefined,
        };
        setFields([...fields, newField]);
        resetForm();
    };


    const resetForm = () => {
        setLabel('');
        setType('text');
        setOptions([]);
        setEditingFieldIndex(null);
    };


    const editField = (index: number) => {
        const fieldToEdit = fields[index];
        setLabel(fieldToEdit.label);
        setType(fieldToEdit.type);
        setOptions(fieldToEdit.options || []);
        setEditingFieldIndex(index);
    };


    const saveField = () => {
        const updatedField: FormField = {
            id: editingFieldIndex !== null ? fields[editingFieldIndex].id : Date.now(),
            label,
            type,
            options: type === 'select' ? options : undefined,
        };

        if (editingFieldIndex !== null) {
            const updatedFields = [...fields];
            updatedFields[editingFieldIndex] = updatedField;
            setFields(updatedFields);
        } else {
            setFields([...fields, updatedField]);
        }
        resetForm();
    };


    const deleteField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };


    const addOption = () => {
        setOptions([...options, '']);
    };


    const updateOption = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };


    const removeOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };


    const saveForm = () => {
        const formJson = JSON.stringify(fields, null, 2);
        const blob = new Blob([formJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'form.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.container}>
            <h2>Создание формы</h2>

            <div className={styles.formGroup}>
                <label>Наименование поля:</label>
                <input
                    type="text"
                    placeholder="Введите вопрос"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Тип поля:</label>
                <select value={type} onChange={(e) => setType(e.target.value as 'text' | 'checkbox' | 'select')}>
                    <option value="text">Текст</option>
                    <option value="checkbox">Один вариант (галочка)</option>
                    <option value="select">Список</option>
                </select>
            </div>

            {type === 'select' && (
                <div className={styles.optionsContainer}>
                    <h4>Варианты:</h4>
                    {options.map((option, index) => (
                        <div key={index} className={styles.optionItem}>
                            <input
                                type="text"
                                placeholder={`Вариант ${index + 1}`}
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeOption(index)}>
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button type="button" className={styles.addButton} onClick={addOption}>
                        Добавить вариант
                    </button>
                </div>
            )}

            <button className={styles.addButton} onClick={editingFieldIndex !== null ? saveField : addField}>
                {editingFieldIndex !== null ? 'Сохранить изменения' : 'Добавить поле'}
            </button>

            <h3 className={styles.preview}>Предварительный просмотр формы</h3>
            <ul>
                {fields.map((field, index) => (
                    <li key={field.id} className={styles.fieldPreview}>
                        {field.label} ({field.type})
                        {field.type === 'select' && (
                            <ul>
                                {field.options?.map((option, optionIndex) => (
                                    <li key={optionIndex}>{option}</li>
                                ))}
                            </ul>
                        )}
                        <button className={styles.editButton} onClick={() => editField(index)}>
                            Редактировать
                        </button>
                        <button className={styles.deleteButton} onClick={() => deleteField(index)}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>

            <button className={styles.saveButton} onClick={saveForm}>Сохранить форму в JSON</button>
        </div>
    );
};

export default FormBuilder;
