const express = require('express');
const { Pool } = require('pg');
const port = 3001;
const cors = require('cors');
const app = express();
app.use(cors());
// To connect to database
const pool = new Pool({
  connectionString: 'postgres://group1db_user:LEjCfIy7NtvcBrP2qB73lon1Z4IInvBM@dpg-cg80u01mbg53mc3cml2g-a.frankfurt-postgres.render.com/group1db?ssl=true',
});


app.listen(port, () => {
  console.log('Server running on port 3001');
});

app.get('/globalv1annual', (req, res) => {
    pool.query('SELECT * FROM globalv1annual', (error, results) => {
        if (error) {
        throw error;
        }
        res.status(200).json(results.rows);
        
    });
    });
  
    app.get('/globalv1monthly', (req, res) => {
      pool.query('SELECT * FROM globalv1monthly', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/northv1annual', (req, res) => { 
      pool.query('SELECT * FROM northv1annual', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);

      });
      });

      app.get('/northv1monthly', (req, res) => {
      pool.query('SELECT * FROM northv1monthly', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/southv1annual', (req, res) => {
      pool.query('SELECT * FROM southv1annual', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/southv1monthly', (req, res) => {
      pool.query('SELECT * FROM southv1monthly', (error, results) => {
          if (error) {  
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/northv1reconstruction', (req, res) => {
      pool.query('SELECT * FROM northv1reconstruction', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
        });
      });

      app.get('/maunaloaco2v2annual', (req, res) => {
      pool.query('SELECT * FROM maunaloaco2v2annual', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/maunaloaco2v2monthly', (req, res) => {
      pool.query('SELECT * FROM maunaloaco2v2monthly', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });
      

      app.get('/v2icecore1', (req, res) => {
      pool.query('SELECT * FROM v2icecore1', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/v2icecore2', (req, res) => {
      pool.query('SELECT * FROM v2icecore2', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/v2icecore3', (req, res) => {
      pool.query('SELECT * FROM v2icecore3', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/v3carbondioxide' , (req, res) => {
      pool.query('SELECT * FROM v3carbondioxide', (error, results) => {
          if (error) {
          throw error;
          }
          res.status(200).json(results.rows);
          
      });
      });

      app.get('/v3events' , (req, res) => {
        pool.query('SELECT * FROM v3events', (error, results) => {

            if (error) {
            throw error;
            }
            res.status(200).json(results.rows);
            
        });
        });

        app.get('/v3gastreconstruction' , (req, res) => {
          pool.query('SELECT * FROM v3gastreconstruction', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });

        app.get('/v4chinaco2' , (req, res) => {
          pool.query('SELECT * FROM v4chinaco2', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });

        app.get('/v4indiaco2' , (req, res) => {
          pool.query('SELECT * FROM v4indiaco2', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });
        
        app.get('/v4usaco2' , (req, res) => {
          pool.query('SELECT * FROM v4usaco2', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });
        
        app.get('/v5globalagricultureforestrylanduse' , (req, res) => {
          pool.query('SELECT * FROM v5globalagricultureforestrylanduse', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });
        
        app.get('/v5globalenergy' , (req, res) => {
          pool.query('SELECT * FROM v5globalenergy', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });
        
        app.get('/v5globalindustrial', (req, res) => {
          pool.query('SELECT * FROM v5globalindustrial', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });
        
        app.get('/v5globalsectors', (req, res) => {
          pool.query('SELECT * FROM v5globalsectors', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });

        app.get('/v5globalwaste', (req, res) => {
          pool.query('SELECT * FROM v5globalwaste', (error, results) => {
              if (error) {
              throw error;
              }
              res.status(200).json(results.rows);
              
          });
          });
    
        




    