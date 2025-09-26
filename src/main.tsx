import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Could not find root element with id "root"');
} else {
  const root = ReactDOM.createRoot(rootElement);

  class ErrorBoundary extends React.Component<
    {},
    { hasError: boolean; error: Error | null }
  > {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error: error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Caught an error: ', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{
            backgroundColor: '#f0f0f0',
            padding: '20px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginTop: '50px'
          }}>
            <h2>Something went wrong.</h2>
            <p style={{ color: 'red' }}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
          </div>
        );
      }

      return this.props.children;
    }
  }

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}