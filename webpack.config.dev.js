module.exports = {
    // ...other webpack configuration options
  
    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    }
  };
  