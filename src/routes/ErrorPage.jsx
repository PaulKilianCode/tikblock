export default function ErrorPage() {
    return (
        <div>
        <h1>Error Page</h1>
        <button onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
    }