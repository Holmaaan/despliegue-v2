import React, { useState } from 'react';

// Componente de Dialog
function Dialog({ children, open, onClose }) {
  if (!open) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <button onClick={onClose} style={styles.closeButton}>X</button>
        {children}
      </div>
    </div>
  );
}

// Componente Button
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} style={styles.button}>
      {children}
    </button>
  );
}

// Componente Input
function Input({ type, value, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={styles.input}
    />
  );
}

// Componente Label
function Label({ children }) {
  return <label style={styles.label}>{children}</label>;
}

// Componente Checkbox
function Checkbox({ checked, onChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={styles.checkbox}
    />
  );
}

// Componente Textarea
function Textarea({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      style={styles.textarea}
    />
  );
}

// Estilos simples para los componentes
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  input: {
    padding: '10px',
    width: '100%',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
  },
  checkbox: {
    margin: '10px 0',
  },
  textarea: {
    padding: '10px',
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

// Componente principal OrderForm
function OrderForm() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', { inputValue, checkboxChecked, textareaValue });
    setDialogOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Order Form</h2>
      <Label>Input Field</Label>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      
      <Label>Textarea</Label>
      <Textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />

      <Checkbox
        checked={checkboxChecked}
        onChange={(e) => setCheckboxChecked(e.target.checked)}
      />
      <Label>Agree to Terms</Label>

      <Button type="submit">Submit</Button>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <h3>Form Submitted</h3>
        <p>Your order has been submitted successfully!</p>
      </Dialog>
    </form>
  );
}

export default OrderForm;
