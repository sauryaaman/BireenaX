const clearLinkedInSession = () => {
  const domains = ['.linkedin.com', '.www.linkedin.com', '.api.linkedin.com'];
  const paths = ['/', '/oauth', '/developers'];
  
  // List of LinkedIn cookie names to clear
  const cookieNames = [
    'li_at',
    'liap',
    'JSESSIONID',
    'bcookie',
    'bscookie',
    'lang',
    'lidc',
    'li_cc',
    'UserMatchHistory',
    'aam_uuid',
    'AMCV_',
    'spectroscopyId'
  ];

  // Set expiration to past date
  const pastDate = new Date(0).toUTCString();

  // Clear all combinations of domains and paths
  cookieNames.forEach(name => {
    domains.forEach(domain => {
      paths.forEach(path => {
        document.cookie = `${name}=; expires=${pastDate}; path=${path}; domain=${domain}; secure; SameSite=None`;
      });
    });
    // Also try without domain
    document.cookie = `${name}=; expires=${pastDate}; path=/; secure; SameSite=None`;
  });

  // Clear any stored OAuth state
  localStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('currentAuthClient');
};
