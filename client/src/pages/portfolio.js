import React, { useEffect, useState } from 'react';
import '../styles/portfolio.css';
import Header from '../components/header';
import Navbar from '../components/navbar';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2"
import TickerTape from '../components/ticker-tape';
import Table from 'react-bootstrap/Table';

function Portfolio() {
  const username = JSON.parse(localStorage.getItem("username")).toUpperCase();
  const username_modified = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  const balance = JSON.parse(localStorage.getItem("balance"));
  const portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
  const [profitList,setProfitList] = useState([])
  const [scoreList,setScoreList] = useState([])
  const [transactions,setTransactions] = useState([])



  useEffect(() => {
    const fetchTransactions = () => {
      const transactionList = JSON.parse(localStorage.getItem("transactions")) || [];
      setTransactions(transactionList);
      
      // Filter transactions where the 6th element is "buy" and then extract profits
      const buyTransactions = transactionList.filter(transaction => transaction[4] === "sell");
      const profits = buyTransactions.map(transaction => transaction[5]);
      const scores = buyTransactions.map(transaction => transaction[6]);
      // Filter out undefined or null values
      const validProfits = profits.filter(profit => profit !== undefined && profit !== null);
      const validScores = scores.filter(score => score !== undefined && score !== null);

      

      // Update the profitList state
      setProfitList(validProfits);
      setScoreList(validScores)
      console.log(profitList);
      console.log(scoreList)
    };

    // Simulate a loading state for 2 seconds
    const timeout = setTimeout(fetchTransactions, 2000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className='portfolio-bg'>
      <Header />
      <TickerTape />
      <Navbar />
      <div className='portfolio-container'>
        <div className='portfolio-user-and-graph'>
          <div className='portfolio-user-box'>
            <div className='portfolio-user-data'>
              <div className='portfolio-user-title'>OVERVIEW</div>
              <div className='portfolio-username portfolio-padding-small'>Username</div>
              <div className='portfolio-username-value portfolio-padding-large'>{username_modified}</div>
              <div className='portfolio-balance portfolio-padding-small'>Balance</div>
              <div className='portfolio-balance-value portfolio-padding-large'>&#x20b9; {balance}</div>
            </div>
          </div>
          <div className='portfolio-graph-box'>
            <div className='portfolio-graph-data'>
              <div className='portfolio-user-title'>PROFIT GRAPH</div>
              </div>
              </div>
        </div>
        <div className='portfolio-holdings-and-transactions'>
          <div className='portfolio-content-title'>HOLDINGS</div>
          <div className='portfolio-holdings-box'>
            <Table striped bordered hover className="portfolio-table">
              <thead>
                <tr>
                  <th className="portfolio-table-header">Stock Name</th>
                  <th className="portfolio-table-header">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item, index) => (
                  <tr key={index}>
                    {Object.keys(item).map((key, idx) => (
                      <td key={idx} className="portfolio-table-cell">{item[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className='portfolio-content-title'>TRANSACTIONS</div>
          <div className='portfolio-transactions-box'>
            <Table striped bordered hover className="portfolio-table">
              <thead>
                <tr>
                  <th className="portfolio-table-header">Stock Name</th>
                  <th className="portfolio-table-header">Date of Transaction</th>
                  <th className="portfolio-table-header">Price</th>
                  <th className="portfolio-table-header">No of Stocks</th>
                  <th className="portfolio-table-header">Action</th>
                  <th className="portfolio-table-header">Profit</th>
                  <th className="portfolio-table-header">Score</th>
                </tr>
              </thead>
              <tbody>
                
              {transactions.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      {transaction.map((value, key) => (
                        <td key={key} className="portfolio-table-cell">{value}</td>
                      ))}
                    </tr>
                  );
                })}

              </tbody>
              {console.log(profitList)}
            </Table>
          </div>
        </div>
        <div className='portfolio-graph-box'>
            <div className='portfolio-graph-data'>
              <div className='portfolio-user-title'>SCORE GRAPH</div>
              
              </div>
              </div>
      </div>
    </div>
  );
}

export default Portfolio;
