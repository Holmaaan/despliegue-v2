import { useState } from "react";

function OrdersPage({ isOpen, onClose, productName, quantity, total }) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [esRegalo, setEsRegalo] = useState(false);
  const [nombreDestinatario, setNombreDestinatario] = useState("");
  const [direccionDestinatario, setDireccionDestinatario] = useState("");
  const [mensajeRegalo, setMensajeRegalo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pedido enviado:", {
      productName,
      quantity,
      total,
      nombre,
      direccion,
      telefono,
      esRegalo,
      nombreDestinatario,
      direccionDestinatario,
      mensajeRegalo,
    });
    onClose();
    // Reset form fields
    setNombre("");
    setDireccion("");
    setTelefono("");
    setEsRegalo(false);
    setNombreDestinatario("");
    setDireccionDestinatario("");
    setMensajeRegalo("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="producto" className="text-right">
                Producto
              </Label>
              <Input
                id="producto"
                value={productName}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cantidad" className="text-right">
                Cantidad
              </Label>
              <Input
                id="cantidad"
                type="number"
                value={quantity}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total" className="text-right">
                Total
              </Label>
              <Input
                id="total"
                value={`$ ${total.toLocaleString()}`}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="esRegalo"
                checked={esRegalo}
                onCheckedChange={(checked) => setEsRegalo(checked)}
              />
              <Label htmlFor="esRegalo">Enviar como regalo</Label>
            </div>
            {esRegalo && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombreDestinatario" className="text-right">
                    Nombre del destinatario
                  </Label>
                  <Input
                    id="nombreDestinatario"
                    value={nombreDestinatario}
                    onChange={(e) => setNombreDestinatario(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="direccionDestinatario" className="text-right">
                    Dirección del destinatario
                  </Label>
                  <Input
                    id="direccionDestinatario"
                    value={direccionDestinatario}
                    onChange={(e) => setDireccionDestinatario(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mensajeRegalo" className="text-right">
                    Mensaje de regalo
                  </Label>
                  <Textarea
                    id="mensajeRegalo"
                    value={mensajeRegalo}
                    onChange={(e) => setMensajeRegalo(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Finalizar Compra</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Dialog component
const Dialog = ({ open, onOpenChange, children }) => (
  open ? <div className="dialog-overlay">{children}</div> : null
);

// DialogContent component
const DialogContent = ({ children, className }) => (
  <div className={`dialog-content ${className}`}>
    {children}
  </div>
);

// DialogHeader component
const DialogHeader = ({ children }) => (
  <div className="dialog-header">
    {children}
  </div>
);

// DialogTitle component
const DialogTitle = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);

// DialogFooter component
const DialogFooter = ({ children }) => (
  <div className="dialog-footer">
    {children}
  </div>
);

// Button component
const Button = ({ type, children }) => (
  <button type={type} className="btn">
    {children}
  </button>
);

// Input component
const Input = ({ id, value, onChange, readOnly, type, className }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
    type={type || "text"}
    className={className}
  />
);

// Label component
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);

// Checkbox component
const Checkbox = ({ id, checked, onCheckedChange }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
  />
);

// Textarea component
const Textarea = ({ id, value, onChange, className }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    className={className}
  />
);

export default OrdersPage;
