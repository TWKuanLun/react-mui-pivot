/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import blueGrey from '@mui/material/colors/blueGrey';
import store from './redux/store';
// import './styles.module.css';
import JsonDataFactory from './Shared/JsonDataFactory';
import DataFactory from './Shared/DataFactory';
import DnDFieldControl from './DnDFieldControl';
import PivotTable from './PivotTable';

// interface Props {
//   AllFields: IField[]
// }

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[600]
    }
  }
});

export function PivotRoot() {
  const testingData = [
    {
      name: 'Jacky',
      gender: 'male',
      onboardDate: new Date('2021-04-09'),
      country: 'Taiwan',
      basePayUSD: 35000,
      grade: 5,
      jobFamilyGroup: 'Finance'
    },
    {
      name: 'Joe',
      gender: 'male',
      onboardDate: new Date('2019-03-12'),
      country: 'Taiwan',
      basePayUSD: 42000,
      grade: 7,
      jobFamilyGroup: 'Finance'
    },
    {
      name: 'Leila',
      gender: 'female',
      onboardDate: new Date('2014-12-11'),
      country: 'Japan',
      basePayUSD: 51000,
      grade: 9,
      jobFamilyGroup: 'Human Resources'
    },
    {
      name: 'Tony',
      gender: 'male',
      onboardDate: new Date('2020-11-10'),
      country: 'Japan',
      basePayUSD: 37000,
      grade: 6,
      jobFamilyGroup: 'Marketing'
    },
    {
      name: 'Amy',
      gender: 'female',
      onboardDate: new Date('2021-07-22'),
      country: 'India',
      basePayUSD: 43000,
      grade: 8,
      jobFamilyGroup: 'Product Development'
    },
    {
      name: 'Jimmy',
      gender: 'male',
      onboardDate: new Date('2017-08-09'),
      country: 'China',
      basePayUSD: 44500,
      grade: 8,
      jobFamilyGroup: 'Product Development'
    },
    {
      name: 'Kristin',
      gender: 'female',
      onboardDate: new Date('2017-01-03'),
      country: 'US',
      basePayUSD: 55000,
      grade: 9,
      jobFamilyGroup: 'Marketing'
    }
  ];
  const dataFactory: DataFactory = new JsonDataFactory(testingData);
  // const TestInConsole = async () => {
  //     let allFields = await dataFactory.GetAllFields();
  //     // let filterCountry = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'country') as IFilteredField;
  //     // filterCountry.FilterValues = ['Taiwan','China', 'Japan', 'US'];

  //     // let filterJobFamilyGroup = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'jobFamilyGroup') as IFilteredField;
  //     // filterJobFamilyGroup.FilterValues = ['Marketing', 'Finance', 'Human Resources'];

  //     let measureBasePay = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'basePayUSD') as IMeasureField;
  //     measureBasePay.Display = 'Avg Base Pay(USD)';
  //     measureBasePay.Summarize = SummarizeType.Average;

  //     // let measureGrade = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'grade') as IMeasureField;
  //     // measureBasePay.Display = 'Grade Count';
  //     // measureBasePay.Summarize = SummarizeType.DistinctCount;

  //     let filters: IFilteredField[] = [];
  //     let measures = [measureBasePay];
  //     let rows = [Enumerable.from(allFields).single(f => f.Name == 'grade') as IFilteredField];
  //     let columns = [Enumerable.from(allFields).single(f => f.Name == 'jobFamilyGroup') as IFilteredField];
  //     let pivotData = await dataFactory.GetData(rows, columns, measures, filters);
  //     console.log(pivotData);
  // };
  // TestInConsole();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={8}>
            <PivotTable dataFactory={dataFactory} />
          </Grid>
          <Grid item xs={4}>
            <DnDFieldControl dataFactory={dataFactory} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}
