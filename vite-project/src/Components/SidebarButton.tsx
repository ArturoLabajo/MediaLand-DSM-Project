// props del menu lateral
type SidebarButtonProps = {
  id: string;
  label: string;
};

function SidebarButton({ id, label }: SidebarButtonProps) {
  // Manejo del uso del click del boton
  const handleClick = () => {
    switch (id) {
      case "home":
        console.log("Ir a Home");
        break;

      case "catalogo":
        console.log("Mostrar películas");
        break;

      case "favoritos":
        console.log("Mostrar favoritos");
        break;

      case "login":
        console.log("Iniciar sesión");
        break;
      
      case "logout":
        console.log("Cerrar sesión");
        break;

      case "legal":
        console.log("Mostrar aviso legal");
        break;
      
      case "contacto":
        console.log("Mostrar contacto");
        break;

      default:
        console.log("Acción desconocida");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: "100%",
        backgroundColor: "rgba(252,237,252,0.08)",
        border: "1px solid rgba(252,237,252,0.15)",
        color: "#FCEDFC",
        padding: "12px",
        borderRadius: "10px",
        marginBottom: "10px",
        textAlign: "left",
        fontWeight: "500"
      }}
    >
      {label}
    </button>
  );
}

export default SidebarButton;