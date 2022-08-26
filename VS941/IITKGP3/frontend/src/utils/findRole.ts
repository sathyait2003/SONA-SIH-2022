const findRole = (petitioners: string[]): string => {
    let role = 'respondent'
    petitioners.forEach((petitioner) => {
        console.log(petitioner, petitioner.toUpperCase().includes('UNIVERSITY GRANTS COMMISSION'))
        if(petitioner.toUpperCase().includes('UNIVERSITY GRANTS COMMISSION')) role = 'petitioner'
    })
    return role
}


export default findRole