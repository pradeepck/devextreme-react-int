import React from 'react';
import DataGrid, { Column, Editing, FilterRow } from 'devextreme-react/data-grid';
import { SelectBox } from 'devextreme-react';

import * as deMessages from 'devextreme/localization/messages/de.json';
import * as ruMessages from 'devextreme/localization/messages/ru.json';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import 'devextreme-intl';

import service from './data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: this.getLocale()
    };
    this.locales = service.getLocales();
    this.payments = service.getPayments();
    this.initMessages();
    locale(this.state.locale);
    this.changeLocale = this.changeLocale.bind(this);
  }
  getLocale() {
    const locale = sessionStorage.getItem('locale');
    return locale != null ? locale : 'en';
  }
  setLocale(locale) {
    sessionStorage.setItem('locale', locale);
  }
  initMessages() {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(service.getDictionary());
  }
  changeLocale(e) {
    this.setState({
      locale: e.value
    });
    this.setLocale(e.value);
    window.location.href = window.location.href;
  }
  render() {
    return (
      <div>
        <DataGrid dataSource={this.payments}
          keyExpr={'PaymentId'}>
          <Editing mode={'popup'}
            allowUpdating={true}
            popup={{
              width:700,
              height:345
            }} />
          <FilterRow visible={true}
            applyFilter={'auto'} />
          <Column dataField={'PaymentId'}
            caption={formatMessage('Number')}
            allowEditing={false}
            width={100} />
          <Column dataField={'ContactName'}
            caption={formatMessage('Contact')} />
          <Column dataField={'CompanyName'}
            caption={formatMessage('Company')} />
          <Column dataField={'Amount'}
            caption={formatMessage('Amount')}
            dataType={'number'}
            format={'currency'}
            editorOptions={{
              format: 'currency',
              showClearButton: true
            }} />
          <Column dataField={'PaymentDate'}
            caption={formatMessage('PaymentDate')}
            dataType={'date'} />
        </DataGrid>
        <div className={'options'}>
          <div className={'caption'}>Options</div>
          <div className={'option'}>
            <label htmlFor={'selectInput'}>Language</label>
            &nbsp;
            <SelectBox items={this.locales}
              valueExpr={'Value'}
              displayExpr={'Name'}
              value={this.state.locale}
              onValueChanged={this.changeLocale}
              inputAttr={{ id: 'selectInput' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
