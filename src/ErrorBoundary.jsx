import { Component } from "react"
import { Link } from "@tanstack/react-router"

class ErrorBoundary extends Component {
    state = { hasError: false }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught some error", error, info)
    }

    render() {
        if (this.state.hasError) {
            <div className="error-boundary">
                <h2>Error Reporting</h2>
                <p>
                    There was an error with this page. <Link to="/">Click here to go back to the Home Page</Link>
                </p>

            </div>
        }
        return this.props.children
    }
}

export default ErrorBoundary
