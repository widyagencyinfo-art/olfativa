import { buyLinks } from "@/lib/affiliate";
import { formatPrice } from "@/lib/data";

export default function BuyBox({ perfume }) {
  const links = buyLinks(perfume);
  return (
    <div className="buybox">
      <div className="buybox-head">
        <h3>¿Dónde comprar {perfume.name}?</h3>
        <span className="buybox-price">{formatPrice(perfume)}</span>
      </div>
      <p className="buybox-text">
        Compara el precio de {perfume.name} de {perfume.brand} (
        {perfume.concentration}) en las principales tiendas de perfumería
        online y elige la mejor oferta.
      </p>
      <div className="buybox-links">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="btn buybox-btn"
          >
            Ver precio en {link.name}
          </a>
        ))}
      </div>
      <p className="buybox-note">
        Precio orientativo. Algunos enlaces son de afiliado: si compras a
        través de ellos, Olfativa puede recibir una comisión sin coste extra
        para ti.
      </p>
    </div>
  );
}
