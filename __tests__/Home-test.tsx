import { render } from '@testing-library/react-native';

import Home from '../src/app';

describe('<Home />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<Home />);

    getByText('Welcome!');
  });
});
