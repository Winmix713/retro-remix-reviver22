import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@contexts/themeContext';
import { ShopProvider } from '@contexts/shopContext';
import { Provider } from 'react-redux';
import store from './app/store';

// FIX: Removed "as HTMLElement"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <ThemeProvider>
                <ShopProvider>
                    <App />
                </ShopProvider>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);