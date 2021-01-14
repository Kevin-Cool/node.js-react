import React from 'react';
import axios from "axios";

const Wingelmandje = (props) => {

    let producten = []
    let totalPrice = 0
    let date =  new Date()
    let order = {
        "created":date.getFullYear() +"-"+( date.getMonth()+1) +"-"+ date.getDate(),
        "street": "",
        "number": "",
        "postalCode": "",
        "city": "",
        "userid": -1,
    }
    if(props.user !== null){
        order.userid = props.user.id
    }
    console.log(order)
    props.mandje.forEach(function buildproducts(productID, index) {
        let found = false;
        producten.forEach(function searchproducts(product, index) {
            if(product.productid === productID){
                product.quantity+=1;
                found = true;
            }
        });
        if(!found){
            producten.push({
                productid: productID,
                quantity: 1
            })
        }
    });

    producten.forEach(function buildproducts(product, index) {
        totalPrice += props.producten[product.productid-1].price * product.quantity
    });

    console.log(producten)

    const deleteWinkelMandje = () => {
        props.setwinkel([]);
    };
    const deleteproduct = (event) => {
        console.log(event.target.value)
        let newWinkelMandje = []
        props.mandje.forEach(function buildproducts(productID, index) {
            if(productID !== event.target.value){
                newWinkelMandje.push(productID)
            }
        });
        props.setwinkel(newWinkelMandje);
    };

    const updatestreet= (event) => {
        order.street = event.target.value;
    };
    const updatenumber = (event) => {
        order.number = event.target.value;
    };
    const updatepostalCode = (event) => {
        order.postalCode = event.target.value;
    };
    const updatecity = (event) => {
        order.city = event.target.value;
    };
    const MaakBestelling = () => {
        if(props.user === null){
            alert("you need to be logged in to make an order")
        }else{
            order.products = producten
            console.log(JSON.stringify(order))
            postOrder(order)
        }
    };
    async function postOrder(json) {
        const res = await axios.post('http://localhost:3000/order', json);
        console.log(res)
        deleteWinkelMandje()
        alert("Your orderID was:"+res.data)
    }

    return (
        <div>
            <h1>Wingelmandje</h1>
            <table className="mandjeTable">
                <tr>
                    <th>price total(euro)</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price per(euro)</th>
                </tr>

                {producten.map((product) => (
                <tr>
                    <td>{(Math.round(props.producten[product.productid-1].price * product.quantity * 100) / 100).toFixed(2)}€</td>
                    <td>{props.producten[product.productid-1].name} </td>
                    <td>{product.quantity} </td>
                    <td>{(Math.round(props.producten[product.productid-1].price * 100) / 100).toFixed(2) } </td>
                    <td><button value={props.producten[product.productid-1].id} onClick={deleteproduct} >Verwijderen</button></td>
                </tr>
                ))}
                <tr>
                    <th>price for all products: {(Math.round(totalPrice * 100) / 100).toFixed(2)} €</th>
                </tr>

            </table>
            <button onClick={deleteWinkelMandje}>Wingelmandje leeg maken</button> <br/><br/>
            <table>
                <tr>
                    <td>Street: </td>
                    <td><input type="text" onChange={updatestreet}/></td>
                </tr>
                <tr>
                    <td>Number: </td>
                    <td><input type="text" onChange={updatenumber}/></td>
                </tr>
                <tr>
                    <td>PostalCode: </td>
                    <td><input type="text" onChange={updatepostalCode}/></td>
                </tr>
                <tr>
                    <td>City: </td>
                    <td><input type="text" onChange={updatecity}/></td>
                </tr>
                <tr>
                    <td colSpan="2"><button onClick={MaakBestelling}>Maak bestelling</button></td>
                </tr>
            </table>
        </div>
    );
};

export default Wingelmandje;