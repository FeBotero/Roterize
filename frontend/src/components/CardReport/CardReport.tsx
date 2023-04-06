import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "phosphor-react";
import "./Card.css";
import * as S from "./styles.ts";

type CardProps = {
  name: string | null;
  address: any;
  refreshCard: any;
  id: any;
  deliveryList: any;
  status: string;
};

export function CardReport({
  name,
  address,
  refreshCard,
  id,
  deliveryList,
  status,
}: CardProps) {
  const navigate = useNavigate();

  console.log(status);
  const card = document.getElementById("card");

  //Função para atualizar o estado da entrega
  function saveLocalStorageID() {
    if (status == "Entregue") {
      localStorage.setItem("idDelivery", id);
      card?.classList.add(status);
      const idTarget: any = localStorage.getItem("idDelivery");
      navigate(refreshCard);
    } else {
      alert("Pedido em rota!");
    }
  }

  return (
    <S.containerCard>
      <div className={`${status}`}>
        <S.headerCard>
          <button onClick={saveLocalStorageID}>
            <h3>{name}</h3>
          </button>
          <div className="package">
            <Package size={32} color="#052074" />
            <h5>{deliveryList}</h5>
          </div>
        </S.headerCard>
        <p>{address} </p>
      </div>
    </S.containerCard>
  );
}
