import { NextPage } from "next";
import useSWR from "swr";
import { Product } from "../../types/Product";

// Usada para cada um dos ids de Produtos retornado pelo getStaticPaths
export async function getStaticProps({ params }: { params: any }) {
  const product = await fetch(
    `http://localhost:3001/products/${params.id}`
  ).then((resp) => resp.json());

  return {
    props: {
      product,
    },
  };
}

// Retorna a lista que identifica os produtos os quais as páginas serão construídas no momento do build
export async function getStaticPaths() {
  const products: Product[] = await fetch(
    "http://localhost:3001/products/"
  ).then((resp) => resp.json());

  const paths = products.map((product: Product) => ({
    params: {
      id: String(product.id),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const Product: NextPage<{ product: Product }> = ({ product }) => {
  const { data: swrProduct, error } = useSWR<Product>("products", () =>
    fetch(`http://localhost:3001/products/${product.id}`).then((resp) =>
      resp.json()
    )
  );

  if (!swrProduct && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Não foi posível obter informações do produto</div>;
  }

  // Essa condição não deve ser nunca encontrada uma vez qeu caso o produto não exista, nossa API deveria retornar um código
  // de erro como 404.
  if (!swrProduct) {
    return <div>Não foi possível localizar o produto</div>;
  }

  return (
    <div>
      <div>{product.title}</div>
      <div>{product.desc}</div>
      <div>{swrProduct.price}</div>
    </div>
  );
};

export default Product;
