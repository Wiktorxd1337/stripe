// Importowanie bibliotek
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Klucz sekretny Stripe z zmiennych środowiskowych
const express = require('express');
const app = express();

// Middleware do obsługi statycznych plików i JSON
app.use(express.static('public'));
app.use(express.json());

// Stała z adresem Twojej domeny
const YOUR_DOMAIN = 'https://yourwebsite.com'; // Zastąp swoim adresem

// Endpoint do tworzenia sesji płatności Stripe
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Podaj dokładny identyfikator ceny (Price ID) produktu, który chcesz sprzedać
          price: 'price_1QdaCgGgU76qWzUhu1w41Tsx', // Zastąp rzeczywistym Price ID z Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`, // Strona sukcesu
      cancel_url: `${YOUR_DOMAIN}/cancel.html`, // Strona anulowania
      automatic_tax: { enabled: true }, // Automatyczne obliczanie podatku
    });

    // Zwróć identyfikator sesji jako JSON
    res.json({ id: session.id });
  } catch (error) {
    console.error('Błąd podczas tworzenia sesji Stripe:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia sesji płatności.' });
  }
});

// Uruchomienie serwera
const PORT = process.env.PORT || 4242; // Port z zmiennej środowiskowej lub domyślnie 4242
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
