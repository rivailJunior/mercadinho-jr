import { Heading } from '@/components/heading';
import { render, screen } from '@testing-library/react';

jest.mock('../../config/env', () => ({
  env: {
    WELCOME_MESSAGE: 'We are here to help you with your Next.js project 🥳',
  },
}));

describe('Heading Component', () => {
  test('should render Heading Component properly', () => {
    render(<Heading />);

    expect(
      screen.getByText(/Hey, let’s build something for your store?/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/We are here to help you with your Next.js project 🥳/i)
    ).toBeInTheDocument();
  });
});
