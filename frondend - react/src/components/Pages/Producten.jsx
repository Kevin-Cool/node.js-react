import React from 'react';

const Producten = (props) => {
    const producten = props.producten;
    console.log(producten)


    const AddBestelling = (event) => {
        props.mandje.push(event.target.value)
    };

    return (
        <div>
            <h1>Producten</h1>
            <ul>
                { producten !== null &&
                producten.map((product) => (
                    <li className="productHolder">
                        <img className="productImage" src={product.picture} />
                        <lu className="producttext">
                            <li className="producttextleft">
                                <p>Product: {product.name}</p>
                                <p>price: {product.price}</p>
                                <p>description: {product.description}</p>
                            </li>
                            <li className="producttextright">
                                <button value={product.id} onClick={AddBestelling} >Bestellen</button>
                            </li>
                        </lu>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Producten;