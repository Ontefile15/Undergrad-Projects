# Card Management System

A comprehensive Next.js application that allows customers to preview their cards, apply for new ones, and renew expired cards with a modern, intuitive interface.

## Features

### 🏦 Card Preview & Management
- **Visual Card Display**: Beautiful card representations with gradient backgrounds
- **Card Details**: View card information including limits, balances, rewards, and benefits
- **Status Indicators**: Clear visual indicators for active, expired, blocked, and pending cards
- **Expiry Warnings**: Automatic notifications for expired or soon-to-expire cards

### 📝 New Card Applications
- **Multi-Step Application Form**: Guided application process with progress tracking
- **Card Selection**: Choose from various card offers (credit, debit, business)
- **Personal Information**: Secure collection of personal, address, and employment details
- **Real-time Validation**: Form validation with helpful error messages
- **Application Review**: Summary page before final submission

### 🔄 Card Renewal System
- **Flexible Renewal Options**: Standard renewal, upgrade, or downgrade
- **Smart Filtering**: Automatic filtering of available upgrade/downgrade options
- **Feature Requests**: Option to request additional features during upgrade
- **Renewal Summary**: Clear overview of renewal choices before submission

### 📊 Dashboard & Analytics
- **Statistics Overview**: Quick stats on total cards, active cards, expired cards, and pending applications
- **Application Tracking**: Monitor the status of submitted applications
- **Renewal Tracking**: Track renewal requests and their progress
- **Responsive Design**: Fully responsive interface that works on all devices

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for modern, responsive design
- **TypeScript**: Full type safety throughout the application
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd card-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── cards/         # Card management endpoints
│   │   ├── applications/  # Application endpoints
│   │   └── renewals/      # Renewal endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main dashboard page
├── components/            # React components
│   ├── CardPreview.tsx    # Card display component
│   ├── CardApplication.tsx # Application form component
│   └── CardRenewal.tsx    # Renewal form component
├── lib/                   # Utility libraries
│   └── mockData.ts       # Mock data for development
└── types/                 # TypeScript type definitions
    └── card.ts           # Card-related types
```

## API Endpoints

### Cards
- `GET /api/cards` - Retrieve all user cards
- Response includes card details, status, limits, and benefits

### Applications
- `GET /api/applications` - Retrieve all applications
- `POST /api/applications` - Submit new card application

### Renewals
- `GET /api/renewals` - Retrieve all renewal requests
- `POST /api/renewals` - Submit card renewal request

## Usage Guide

### Viewing Cards
1. Navigate to the dashboard to see all your cards
2. Each card displays key information including:
   - Card type and name
   - Current status
   - Credit limit and available balance
   - Rewards rate and type
   - Benefits and features
   - Annual fee

### Applying for New Cards
1. Click "Apply for New Card" button
2. Choose from available card offers
3. Fill out the multi-step application form:
   - **Step 1**: Select your desired card
   - **Step 2**: Enter personal information
   - **Step 3**: Provide address details
   - **Step 4**: Submit employment information
   - **Step 5**: Review and submit application
4. Track your application status on the dashboard

### Renewing Cards
1. Cards that are expired or expiring soon will show a "Renew" button
2. Choose your renewal type:
   - **Standard Renewal**: Keep same features and benefits
   - **Upgrade**: Move to a premium card with enhanced benefits
   - **Downgrade**: Switch to a card with lower fees
3. For upgrades/downgrades, select from available options
4. Add optional feature requests for upgrades
5. Review and submit your renewal request

## Mock Data

The application includes comprehensive mock data for development and demonstration:

- **3 Sample Cards**: Credit, debit, and business cards with different statuses
- **Card Offers**: Various card types with different benefits and eligibility requirements
- **Sample Applications**: Pending applications for testing
- **Renewal Requests**: Example renewal requests in different states

## Customization

### Adding New Card Types
1. Update the `CardOffer` interface in `src/types/card.ts`
2. Add new offers to `mockCardOffers` in `src/lib/mockData.ts`
3. Update card type colors in `CardPreview.tsx` if needed

### Modifying Application Flow
1. Update the `steps` array in `CardApplication.tsx`
2. Add new form sections as needed
3. Update validation logic in `isStepValid()` function

### Styling Customization
- Colors and themes can be customized in `tailwind.config.ts`
- Component-specific styles are in individual component files
- Global styles are in `src/app/globals.css`

## Features in Detail

### Card Status Management
- **Active**: Cards that are currently usable
- **Expired**: Cards that have passed their expiry date
- **Blocked**: Cards that have been temporarily blocked
- **Pending**: Cards that are being processed

### Application Status Tracking
- **Draft**: Application saved but not submitted
- **Submitted**: Application sent for review
- **Pending**: Application under review
- **Approved**: Application accepted
- **Rejected**: Application declined

### Renewal Types
- **Standard**: Renew with existing features
- **Upgrade**: Enhanced card with premium benefits
- **Downgrade**: Basic card with lower fees

## Security Considerations

- Personal information is handled securely
- SSN input is limited to last 4 digits
- Form validation prevents submission of incomplete data
- API endpoints include proper error handling

## Future Enhancements

Potential improvements for production use:

- **Authentication**: User login and session management
- **Database Integration**: Replace mock data with real database
- **Payment Processing**: Integration with payment gateways
- **Document Upload**: Support for ID and income verification
- **Email Notifications**: Automated status update emails
- **Mobile App**: React Native or Progressive Web App
- **Advanced Security**: Two-factor authentication, fraud detection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
