import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
  },
  formControl: {
    width: '100%',
    marginBottom: 8
  },
  disabledDropdown: {
    backgroundColor: "#F8F8F8"
  },
  tabs: {
    cursor: "pointer",
    padding: "12px 12px 12px 0px"
  },
  selectedTab: {
    textDecoration: "underline"
  },
  installerSection: {
    margin: '1rem 0',
  },
})

const Installer = ({
  setCompany,
  setStreet,
  setUnit,
  setCity,
  setZip,
  quote,
  installerType,
  handleInstallerChange }) => {
  const classes = useStyles()
  return (
    <Box className={classes.installerSection}>
      <RadioGroup value={installerType} onChange={handleInstallerChange}>
        <FormControlLabel
          value={quote.repair_shop ? 'installer' : 'transmission_package'}
          control={<Radio />}
          label={
            quote.repair_shop
              ? < Box className={classes.installerSection} >
                <Typography style={{ fontWeight: 'bold' }}>Installer</Typography>
                <Typography>{quote.repair_shop.name}</Typography>
                <Typography>{quote.repair_shop.zip} {quote.repair_shop.street}</Typography>
                <Typography>{quote.repair_shop.city}, {quote.repair_shop.state}</Typography>
              </Box >
              : <Box className={classes.installerSection}>
                <Typography>Ship <span style={{ fontWeight: 'bold' }}>Transmission Package</span> to an installer of your choice</Typography>
                <Typography>Please contact Flexor to schedule your service with our Flexor network shop.Call us at <span>888-FLEXOR3</span> or <span>888-353-9673</span></Typography>
              </Box >
          }
        />
        <FormControlLabel
          value='transmission_only'
          control={<Radio />}
          label={<Typography>Ship <span style={{ fontWeight: 'bold' }}>Transmission Only</span> to an installer of your choice for $3,075.00</Typography>}
        />
      </RadioGroup>
      {
        installerType === 'transmission_only'
          ? <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Box >
                <form
                  noValidate
                  autoComplete='off'>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <FormControl className={classes.formControl}>
                        <TextField
                          focused
                          size="small"
                          id='company'
                          label="Company"
                          onChange={(e) => setCompany(e.target.value)}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                          autoFocus={true}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          size="small"
                          id='address-line-1'
                          label="Line 1"
                          onChange={(e) => setStreet(e.target.value)}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          size="small"
                          id='address-line-1'
                          label="Line 2"
                          onChange={(e) => setUnit(e.target.value)}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          size="small"
                          id='city'
                          label="City"
                          onChange={(e) => setCity(e.target.value)}
                          variant="outlined"
                          // placeholder="Enter City"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          size="small"
                          id='post-code-zip'
                          label="Postcode / ZIP"
                          onChange={(e) => setZip(e.target.value)}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          size="small"
                          id='post-code-zip'
                          label="Postcode / ZIP"
                          // value={phoneNumber}
                          // onChange={handlePhoneNumberChange}
                          variant="outlined"
                          // placeholder="Enter Postcode / ZIP"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          size="small"
                          id='country-region'
                          label="Country / Region"
                          // placeholder="Enter Country / Region"
                          // value={zipCode}
                          // onChange={handleZipChange}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </FormControl>
                    </Grid> */}
                  </Grid>

                </form>
              </Box>
            </Grid>
          </Grid>
          : null
      }

    </Box>
  )
}

export default Installer
