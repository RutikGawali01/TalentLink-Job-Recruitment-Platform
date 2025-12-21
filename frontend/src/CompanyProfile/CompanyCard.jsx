import {ActionIcon, useMantineTheme} from "@mantine/core";
import {IconExternalLink} from "@tabler/icons-react"


const CompanyCard = (props) => {
    const theme = useMantineTheme();
  return (
    <div>
      <div className='flex justify-between bg-mine-shaft-900 items-center rounded-lg p-2'>
          <div className='flex gap-2 items-center '>
              <div className='p-2 rounded-md  bg-mine-shaft-800 '> 
                <img className='h-7 ' src={`/Icons/${props.name}.png`} alt="" /> 
              </div>

              <div>
                 <div className='font-semibold'>{props.name}
                  </div>
                  <div className='text-xs text-mine-shaft-300'>
                      {props.employees} Employees
                  </div>
              </div>

          </div>
          <ActionIcon color={theme.colors.brightSun[4]} variant="subtle" >
            <IconExternalLink   />
          </ActionIcon>
            
       </div>
    </div>
  )
}

export default CompanyCard
