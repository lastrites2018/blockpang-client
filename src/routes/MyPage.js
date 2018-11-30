import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Input,
  Menu,
  Table
} from 'semantic-ui-react';
import './MyPage.scss';
import WalletInfo from '../components/MyPage/walletInfo';
import EditWalletForm from '../components/MyPage/editWalletForm';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // walletAddress: localStorage.getItem('walletAddress'),
      walletAddress: 'hxc4193cda4a75526bf50896ec242d6713bb6b02a3',
      activeMenu: 'Manage Wallet',
      isEditingWallet: false
    };
  }

  _manageWalletContent() {
    return this.state.walletAddress ? (
      <div>
        {this.state.isEditingWallet ? (
          <EditWalletForm
            walletAddress={this.state.walletAddress}
            handleEditWallet={() => this._handleEditWallet()}
            updateWalletAddress={arg => this._updateWalletAddress(arg)}
          />
        ) : (
          <WalletInfo
            walletAddress={this.state.walletAddress}
            handleEditWallet={() => this._handleEditWallet()}
          />
        )}
      </div>
    ) : (
      <div>
        <div>
          <Input
            size="tiny"
            style={{ width: '100%', color: 'teal' }}
            icon="chain"
            iconPosition="left"
            action={{
              color: 'teal',
              content: 'Register Wallet',
              onClick: () => this._handleRegisterWallet()
            }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Button
            onClick={this._handleCreateWallet}
            style={{ backgroundColor: '#1aaaba', color: '#FFFFFF' }}
          >
            Create Wallet
          </Button>
        </div>
      </div>
    );
  }

  _gameRecordContent() {
    return (
      <Table basic="very" celled collapsing style={{ width: '100%' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>ICX won</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>12:30pm</Table.Cell>
            <Table.Cell>22</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  _handleMenuClick = (e, { name }) => this.setState({ activeMenu: name });

  _handleRegisterWallet() {
    console.log('clicked handleRegisterWallet');
  }

  _handleCreateWallet() {
    console.log('clicked handleCreateWallet');
  }

  _handleEditWallet() {
    this.setState(prevState => ({
      isEditingWallet: !prevState.isEditingWallet
    }));
  }
  _updateWalletAddress(newAddress) {
    this.setState({ walletAddress: newAddress });
  }

  render() {
    const { activeMenu } = this.state;

    // FIXME: fix the following auth logic below
    if (!this.props.isLoggedIn) {
      if (!localStorage.getItem('userData')) {
        return <Redirect to={'/'} />;
      }
    }

    return (
      <Container>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Header as="h1">My Page</Header>
            </Grid.Row>
            <Grid.Row>
              <Menu attached="top" tabular>
                <Menu.Item
                  name="Manage Wallet"
                  active={activeMenu === 'Manage Wallet'}
                  onClick={this._handleMenuClick}
                />
                <Menu.Item
                  name="Game Record"
                  active={activeMenu === 'Game Record'}
                  onClick={this._handleMenuClick}
                />
              </Menu>

              <Segment attached="bottom">
                {activeMenu === 'Manage Wallet'
                  ? this._manageWalletContent()
                  : this._gameRecordContent()}
              </Segment>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default MyPage;
