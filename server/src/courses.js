export const courses = [
  { id:'ethical-hacking', title:'Ethical Hacking', category:'Cybersecurity', level:'Beginner → Advanced', icon:'shield', description:'Learn security foundations, networking, Linux, and web security in authorized labs.', lessons:[
    {id:'eh1',title:'Introduction to Ethical Hacking',duration:'12 min',level:'Beginner',summary:'Understand ethical hacking, permission, scope, and responsible disclosure.'},
    {id:'eh2',title:'Computer & Operating System Basics',duration:'18 min',level:'Beginner',summary:'Learn operating systems, files, processes, and the command line.'},
    {id:'eh3',title:'Networking Fundamentals',duration:'22 min',level:'Beginner',summary:'Explore IP addresses, DNS, HTTP/HTTPS, ports, and protocols.'},
    {id:'eh4',title:'Linux Command Line',duration:'20 min',level:'Beginner',summary:'Practice navigation, files, permissions, and processes in a safe environment.'},
    {id:'eh5',title:'Security Fundamentals',duration:'24 min',level:'Intermediate',summary:'Learn authentication, authorization, encryption, hashing, and risk.'},
    {id:'eh6',title:'Web Security & OWASP',duration:'30 min',level:'Intermediate',summary:'Study common web risks using intentionally vulnerable training apps only.'}
  ]},
  { id:'python', title:'Python', category:'Programming', level:'Beginner → Advanced', icon:'code', description:'Build a strong Python foundation and progress to automation and projects.', lessons:[
    {id:'py1',title:'Python: First Steps',duration:'10 min',level:'Beginner',summary:'What Python is, where it is used, and how a program runs.'},
    {id:'py2',title:'Variables & Data Types',duration:'16 min',level:'Beginner',summary:'Store text, numbers, booleans, and understand basic types.'},
    {id:'py3',title:'Input, Output & Operators',duration:'14 min',level:'Beginner',summary:'Read input, display output, and work with operators.'},
    {id:'py4',title:'Conditions & Loops',duration:'22 min',level:'Beginner',summary:'Use if/elif/else, for loops, and while loops.'},
    {id:'py5',title:'Functions & Collections',duration:'28 min',level:'Intermediate',summary:'Create reusable functions and work with lists and dictionaries.'},
    {id:'py6',title:'Files, Errors & Projects',duration:'30 min',level:'Intermediate',summary:'Read files, handle exceptions, and build a small project.'}
  ]},
  { id:'web-dev', title:'HTML & CSS', category:'Web Development', level:'Beginner → Intermediate', icon:'globe', description:'Create accessible, responsive websites from the ground up.', lessons:[
    {id:'web1',title:'How the Web Works',duration:'10 min',level:'Beginner',summary:'Understand browsers, websites, URLs, and HTML documents.'},
    {id:'web2',title:'HTML Elements & Forms',duration:'20 min',level:'Beginner',summary:'Build page structure with semantic elements, links, and forms.'},
    {id:'web3',title:'CSS Fundamentals',duration:'24 min',level:'Beginner',summary:'Style text, colors, spacing, borders, and layouts.'},
    {id:'web4',title:'Flexbox, Grid & Responsive Design',duration:'30 min',level:'Intermediate',summary:'Create layouts that adapt to different screen sizes.'}
  ]},
  { id:'javascript', title:'JavaScript', category:'Programming', level:'Beginner → Advanced', icon:'code', description:'Add interactivity and learn modern JavaScript fundamentals.', lessons:[
    {id:'js1',title:'JavaScript Basics',duration:'16 min',level:'Beginner',summary:'Variables, values, operators, and expressions.'},
    {id:'js2',title:'Functions & Arrays',duration:'22 min',level:'Beginner',summary:'Write functions and manipulate arrays and objects.'},
    {id:'js3',title:'DOM & Events',duration:'25 min',level:'Intermediate',summary:'Respond to user actions and update web pages.'},
    {id:'js4',title:'Async JavaScript & APIs',duration:'30 min',level:'Intermediate',summary:'Learn promises, async/await, and fetch.'}
  ]},
  { id:'java', title:'Java', category:'Programming', level:'Beginner → Advanced', icon:'code', description:'Learn object-oriented programming and build Java applications.', lessons:[
    {id:'ja1',title:'Java Setup & First Program',duration:'15 min',level:'Beginner',summary:'Understand the JDK and create your first Java program.'},
    {id:'ja2',title:'Types, Conditions & Loops',duration:'22 min',level:'Beginner',summary:'Work with variables, branching, and iteration.'},
    {id:'ja3',title:'Object-Oriented Programming',duration:'30 min',level:'Intermediate',summary:'Learn classes, objects, inheritance, and encapsulation.'}
  ]},
  { id:'sql', title:'SQL & Databases', category:'Database', level:'Beginner → Intermediate', icon:'database', description:'Query data, connect tables, and understand relational databases.', lessons:[
    {id:'sql1',title:'Database Fundamentals',duration:'12 min',level:'Beginner',summary:'Tables, rows, columns, keys, and relational data.'},
    {id:'sql2',title:'SELECT, WHERE & ORDER BY',duration:'18 min',level:'Beginner',summary:'Retrieve, filter, and sort records.'},
    {id:'sql3',title:'JOINs & Aggregations',duration:'26 min',level:'Intermediate',summary:'Combine related tables and summarize results.'}
  ]},
  { id:'linux', title:'Linux', category:'Operating Systems', level:'Beginner → Intermediate', icon:'terminal', description:'Practice Linux fundamentals and system administration basics.', lessons:[
    {id:'li1',title:'Linux Basics',duration:'14 min',level:'Beginner',summary:'Understand distributions, shell, and filesystem structure.'},
    {id:'li2',title:'Commands & Permissions',duration:'22 min',level:'Beginner',summary:'Navigate directories, manage files, and inspect permissions.'},
    {id:'li3',title:'Processes & Services',duration:'24 min',level:'Intermediate',summary:'Inspect processes and understand services safely.'}
  ]},
  { id:'networking', title:'Networking', category:'Cybersecurity', level:'Beginner → Intermediate', icon:'globe', description:'Learn the core concepts behind modern computer networks.', lessons:[
    {id:'net1',title:'Network Models',duration:'16 min',level:'Beginner',summary:'Understand LAN, WAN, and the OSI/TCP-IP models.'},
    {id:'net2',title:'IP, DNS & Ports',duration:'20 min',level:'Beginner',summary:'Learn addressing, name resolution, and common ports.'},
    {id:'net3',title:'HTTP, TLS & Troubleshooting',duration:'25 min',level:'Intermediate',summary:'Understand web traffic and basic diagnostics.'}
  ]}
]
