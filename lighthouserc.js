module.exports = {
  ci: {
    collect: {
      url: [
        'https://www.openqase.com/',
        'https://www.openqase.com/case-study/classiq-sumitomo-corporation-financial-risk-management',
        'https://www.openqase.com/case-study/quantinuum-hsbc-financial-services-enhancement',
        'https://www.openqase.com/blog',
        'https://www.openqase.com/contact'
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless'
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      }
    }
  }
};