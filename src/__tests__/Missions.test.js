import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import Missions from '../pages/Missions';

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve([{
    mission_id: '1',
    mission_name: 'some name',
    description: 'some description',
  }]),
});

const LocalMissions = () => (
  <Provider store={store}>
    <Missions />
  </Provider>
);

describe('Mission Page', () => {
  it('gets rendered', () => {
    render(<LocalMissions />);
    const element = screen.getByRole('heading', { name: 'Missions' });
    expect(element).toBeVisible();
  });

  it('shows mission on the page', () => {
    render(<LocalMissions />);
    const elementName = screen.getByRole('cell', { name: 'some name' });
    const elementDescrription = screen.getByRole('cell', { name: 'some description' });
    const joinButton = screen.getByRole('button', { name: 'Join Mission' });
    const elementStatus = screen.getByRole('cell', { name: /not a member/i });
    expect(elementName).toBeVisible();
    expect(elementDescrription).toBeVisible();
    expect(joinButton).toBeVisible();
    expect(elementStatus).toBeVisible();
  });
});
