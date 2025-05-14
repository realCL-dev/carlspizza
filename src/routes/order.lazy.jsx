import { useEffect, useState, useContext } from "react"
import { createLazyFileRoute } from "@tanstack/react-router"
import Pizza from "../Pizza"
import Cart from "../Cart"
import { CartContext } from "../contexts"

export const Route = createLazyFileRoute('/order')({
    component: Order,
})

const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
})

export default function Order() {
    // const pizzaType = "pepperoni"
    // const pizzaSize = "M"
    const [pizzaTypes, setPizzaTypes] = useState([])
    const [pizzaId, setPizzaId] = useState("pepperoni")
    const [pizzaSize, setPizzaSize] = useState("L")
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useContext(CartContext)

    async function checkout() {
        setLoading(true);

        await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
            }),
        });

        setCart([]);
        setLoading(false);
    }

    let price, selectedPizza

    if (!loading) {
        selectedPizza = pizzaTypes.find((pizza) => pizzaId === pizza.id)
        price = intl.format(selectedPizza.sizes[pizzaSize])
    }

    async function fetchPizzaTypes() {
        try {
            const pizzaRes = await fetch("/api/pizzas")
            const pizzaJson = await pizzaRes.json()
            setPizzaTypes(pizzaJson);
        } catch (error) {
            console.error("Failed to fetch pizza types:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchPizzaTypes() }, [])

    return (
        <div className="order-page">
            <div className="order">
                <h2>Create Order</h2>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }])
                }}>
                    <div>
                        <div>
                            <label htmlFor="pizza-id">Pizza Type</label>
                            <select
                                onChange={(e) => setPizzaId(e.target.value)}
                                name="pizza-id" value={pizzaId}>
                                {
                                    pizzaTypes.map((pizza) => (
                                        <option key={pizza.id} value={pizza.id}>
                                            {pizza.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pizza-size">Pizza Size</label>
                            <div>
                                <span>
                                    <input
                                        onChange={(e) => setPizzaSize(e.target.value)}
                                        checked={pizzaSize === 'S'}
                                        type="radio"
                                        name="pizza-size"
                                        value="S"
                                        id="pizza-s"
                                    />
                                    <label htmlFor="pizza-s">Small</label>
                                </span>
                                <span>
                                    <input
                                        onChange={(e) => setPizzaSize(e.target.value)}
                                        checked={pizzaSize === 'M'}
                                        type="radio"
                                        name="pizza-size"
                                        value="M"
                                        id="pizza-m"
                                    />
                                    <label htmlFor="pizza-m">Medium</label>
                                </span>
                                <span>
                                    <input
                                        onChange={(e) => setPizzaSize(e.target.value)}
                                        checked={pizzaSize === 'L'}
                                        type="radio"
                                        name="pizza-size"
                                        value="L"
                                        id="pizza-l"
                                    />
                                    <label htmlFor="pizza-l">Large</label>
                                </span>
                            </div>
                        </div>
                        <button type="submit">Add to Cart</button>
                    </div>
                    {
                        loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            <div className="order-pizza">
                                <Pizza
                                    name={selectedPizza.name}
                                    description={selectedPizza.description}
                                    image={selectedPizza.image}
                                />
                                <p>{price}</p>
                            </div>
                        )
                    }
                </form>

            </div>
            {
                loading ? <h2>Loading...</h2> : <Cart checkout={checkout} cart={cart} />
            }
        </div>
    )
}