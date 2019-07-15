def report():
    num = 0
    template = f'''
        <html>
            <head> 
                <title> report </title>
            </head>
            <body>
                <h1 style="text-align : center"> FUZZAD CRASH REPORT </h1>
                <br/>
                <table>
                    <tbody>
                        <tr style="background-color: gray; color: white">
                            <th style="padding : 5px"> target program </th>
                            <th style="padding : 5px"> iteration </th>
                            <th style="padding : 5px"> sample file</th>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    '''

    f = open('./test.html',"w")
    f.write(template)

report()