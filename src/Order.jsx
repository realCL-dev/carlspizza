import { useEffect, useState } from "react"
import Pizza from "./Pizza"

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
        <div className="order">
            <h2>Create Order</h2>
            <form>
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
    )
}