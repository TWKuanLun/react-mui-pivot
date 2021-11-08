import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
//import './styles.module.css';
import IMeasureField, { SummarizeType } from './Shared/Interface/IMeasureField';
import IFilteredField from './Shared/Interface/IFilteredField';
import JsonDataFactory from './Shared/JsonDataFactory';
import DataFactory from './Shared/DataFactory';
import Enumerable from 'linq';
import FieldList from './FieldList';

// interface Props {
//   AllFields: IField[]
// }
const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[600]
    },
  }
});

export const PivotRoot = () => {
  let testingData = [
    { name: 'Jacky', gender: 'male', onboardDate: new Date('2021-04-09'), country: 'Taiwan', basePayUSD: 35000, grade: 5, jobFamilyGroup: 'Finance' }
    , { name: 'Joe', gender: 'male', onboardDate: new Date('2019-03-12'), country: 'Taiwan', basePayUSD: 42000, grade: 7, jobFamilyGroup: 'Finance' }
    , { name: 'Leila', gender: 'female', onboardDate: new Date('2014-12-11'), country: 'Japan', basePayUSD: 51000, grade: 9, jobFamilyGroup: 'Human Resources' }
    , { name: 'Tony', gender: 'male', onboardDate: new Date('2020-11-10'), country: 'Japan', basePayUSD: 37000, grade: 6, jobFamilyGroup: 'Marketing' }
    , { name: 'Amy', gender: 'female', onboardDate: new Date('2021-07-22'), country: 'India', basePayUSD: 43000, grade: 8, jobFamilyGroup: 'Product Development' }
    , { name: 'Jimmy', gender: 'male', onboardDate: new Date('2017-08-09'), country: 'China', basePayUSD: 44500, grade: 8, jobFamilyGroup: 'Product Development' }
    , { name: 'Kristin', gender: 'female', onboardDate: new Date('2017-01-03'), country: 'US', basePayUSD: 55000, grade: 9, jobFamilyGroup: 'Marketing' }
  ];
  let dataFactory: DataFactory = new JsonDataFactory(testingData);
  const TestInConsole = async () => {
    let allFields = await dataFactory.GetAllFields();
    // let filterCountry = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'country') as IFilteredField;
    // filterCountry.FilterValues = ['Taiwan','China', 'Japan', 'US'];

    // let filterJobFamilyGroup = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'jobFamilyGroup') as IFilteredField;
    // filterJobFamilyGroup.FilterValues = ['Marketing', 'Finance', 'Human Resources'];

    let measureBasePay = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'basePayUSD') as IMeasureField;
    measureBasePay.Display = 'Avg Base Pay(USD)';
    measureBasePay.Summarize = SummarizeType.Average;

    // let measureGrade = Enumerable.from(allFields).singleOrDefault(f => f.Name == 'grade') as IMeasureField;
    // measureBasePay.Display = 'Grade Count';
    // measureBasePay.Summarize = SummarizeType.DistinctCount;

    let filters: IFilteredField[] = [];
    let measures = [measureBasePay];
    let rows = [Enumerable.from(allFields).single(f => f.Name == 'grade') as IFilteredField];
    let columns = [Enumerable.from(allFields).single(f => f.Name == 'jobFamilyGroup') as IFilteredField];
    let pivotData = await dataFactory.GetData(rows, columns, measures, filters);
    console.log(pivotData);
  };
  TestInConsole();


  return (
    <ThemeProvider theme={theme}>
      <FieldList dataFactory={dataFactory} />
    </ThemeProvider>
  )
}
