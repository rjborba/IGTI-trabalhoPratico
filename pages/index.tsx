import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Product } from "../types/Product";

const ListWrapper = styled.ul`
  li {
    list-style: none;
    padding: 4px 8px;
  }
`;

const Title = styled.h2`
  padding-left: 16px;
`;

export async function getStaticProps() {
  const products = await fetch("http://localhost:3001/products").then((resp) =>
    resp.json()
  );

  return {
    props: {
      products,
    },
  };
}

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
  return (
    <div>
      <Title>Produtos mais Interessantes</Title>
      <ListWrapper>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          );
        })}
      </ListWrapper>
    </div>
  );
};

export default Home;
