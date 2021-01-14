import React, {useEffect, useState} from 'react';
import axios from "axios";

const Bestellingen = (props) => {

    const [bestellingen,setbestellingen] = useState(null);


    useEffect( () =>{
        axios.get("http://localhost:3000/order/user/"+props.user.id,  { crossdomain: true }).then(response => {
            setbestellingen(response.data);
            console.log(response.data);
        });
    }, [])

    return (
        <div>
            <h1>Bestellingen</h1>
            <lu className="BestellingenTable">
                {bestellingen !== null &&
                bestellingen.map((bestelling) => (
                    <li className="BastellingItem">
                        <li>created: {bestelling.created} </li>
                        <li>street: {bestelling.street} </li>
                        <li>number: {bestelling.number} </li>
                        <li>postalCode: {bestelling.postalCode} </li>
                        <li>city: {bestelling.city} </li>
                        <li>totalPrice: {bestelling.totalPrice} euro</li>
                        <li className="productenholder">
                            {bestelling.products !== null &&
                            bestelling.products.map((product) => (
                                <li className="BestellingProduct">
                                    <li>quantity: {product.quantity} </li>
                                    <li>price: {product.price} euro </li>
                                    <li>name: {product.name} </li>
                                </li>
                            ))}
                        </li>
                    </li>
                ))}
            </lu>
        </div>
    );
};

export default Bestellingen;