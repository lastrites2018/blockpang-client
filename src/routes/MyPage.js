import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Divider,
  Menu
} from 'semantic-ui-react';
import './MyPage.scss';
import WalletInfo from '../components/MyPage/walletInfo';
import WalletForm from '../components/MyPage/walletForm';
import GameRecord from '../components/MyPage/gameRecord';
import Modal from '../components/MyPage/modal';
import axios from 'axios';
import util from '../util';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '',
      walletKey: '',
      activeMenu: 'Manage Wallet',
      isEditingWallet: false,
      isWalletCreated: false
    };
  }

  _requestTransfer(gameScore) {
    const userData = {
      user: JSON.parse(localStorage.getItem('userData')),
      wallet: localStorage.getItem('walletAddress'),
      gameScore
    };

    axios
      .post('http://54.180.114.119:8000/transfer', userData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        throw err;
      });
  }

  _toggleModal() {
    return this.state.isWalletCreated ? (
      <React.Fragment>
        <WalletInfo
          walletAddress={this.state.walletAddress}
          handleEditWallet={() => this._handleEditWallet()}
        />
        <Modal
          walletAddress={this.state.walletAddress}
          walletKey={this.state.walletKey}
        />
      </React.Fragment>
    ) : (
      <WalletInfo
        walletAddress={this.state.walletAddress}
        handleEditWallet={() => this._handleEditWallet()}
      />
    );
  }

  _manageWalletContent() {
    return this.state.walletAddress ? (
      <div>
        {this.state.isEditingWallet ? (
          <WalletForm
            walletAddress={this.state.walletAddress}
            handleEditWallet={() => this._handleEditWallet()}
            updateWalletAddress={arg => this._updateWalletAddress(arg)}
          />
        ) : (
          this._toggleModal()
        )}
      </div>
    ) : (
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header>Already have a wallet?</Header>
              <WalletForm
                walletAddress={this.state.walletAddress}
                handleEditWallet={() => this._handleEditWallet()}
                updateWalletAddress={arg => this._updateWalletAddress(arg)}
              />
            </Grid.Column>

            <Grid.Column>
              <Header>Don't have a wallet yet?</Header>
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <Button positive onClick={() => this._handleCreateWallet()}>
                  Create Wallet
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }

  _handleMenuClick = (e, { name }) => this.setState({ activeMenu: name });

  _handleCreateWallet() {
    // get user data from localStorage for API use
    const {
      email,
      provider,
      provider_id,
      provider_pic,
      name
    } = util.userData();
    const reqBody = {
      email,
      profile_img_url: provider_pic,
      nickname: name,
      service_provider: provider,
      user_pid: provider_id
    };
    console.log('reqBody', JSON.stringify(reqBody));
    // API call to create a new wallet
    axios
      .post(util.API_URLS['create_wallet'], JSON.stringify(reqBody))
      .then(res => {
        console.log('reqBody', reqBody);
        // save address to localStorage
        util.setWalletAddress(res.data.address);

        // setState so it renders a modal
        this.setState({
          isWalletCreated: true,
          walletAddress: res.data.address,
          walletKey: res.data.key
        });

        // if previousGameScore, transfer coin
        if (localStorage.getItem('previousGameScore')) {
          const previousGameScore = localStorage.getItem('previousGameScore');
          this._requestTransfer(previousGameScore);
          // reset previousGameScore
          localStorage.setItem('previousGameScore', '');
        }
      })
      .catch(err => {
        throw err;
      });
  }

  _handleEditWallet() {
    console.log('handleEditWallet called');
    console.log('before', this.state.isEditingWallet);
    this.setState(prevState => ({
      isEditingWallet: !prevState.isEditingWallet
    }));
  }
  _updateWalletAddress(newAddress) {
    // get user data from localStorage for API use
    const {
      email,
      provider,
      provider_id,
      provider_pic,
      name
    } = util.userData();
    const reqBody = {
      email,
      profile_img_url: provider_pic,
      nickname: name,
      service_provider: provider,
      user_pid: provider_id,
      wallet: newAddress
    };

    // call update API
    axios
      .post(util.API_URLS['update_wallet'], JSON.stringify(reqBody))
      .then(res => {
        this.setState({ walletAddress: newAddress });
        util.setWalletAddress(newAddress);
      })
      .catch(err => {
        throw err;
      });
  }

  componentDidMount() {
    this.setState({ walletAddress: util.walletAddress() });
  }

  render() {
    const { activeMenu } = this.state;

    // FIXME: fix the following auth logic below
    if (!this.props.isLoggedIn) {
      if (!util.isLoggedIn()) {
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
                {activeMenu === 'Manage Wallet' ? (
                  this._manageWalletContent()
                ) : (
                  <GameRecord />
                )}
              </Segment>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default MyPage;
