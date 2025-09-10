import { FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { CDT, workingHours, contacts, socialMedia } from '../constans.ts';
import './Footer.css'

export const Footer: React.FC = () => {
  return (
      <div className="footer">
        <div className='cdt'>

          {CDT.map(({ title }, index) => (
            <FooterTitle key={index} title={title} className='five cdt-text no-text-transform' />
          ))}
        </div>

        <div className='working-hours'>
          <FooterTitle title="Время работы:" className='five working-hours-title no-text-transform' />
            <FooterLinkGroup col className='gap-4'>
            {workingHours.map(({ day, time }, index) => (
              <FooterLinkGroup key={index} className='four working-hours-element'>
                <FooterLink href="#" className='working-hours-day'>{day}</FooterLink>
                <FooterLink href="#" className='working-hours-time'>{time}</FooterLink>
              </FooterLinkGroup>
            ))}
          </FooterLinkGroup>
        </div>

        <div className='contacts'>
          <FooterTitle title="Контакты:" className='five contacts-title no-text-transform' />
          {contacts.map(({ imgSrc, text, href }, index) => (
            <FooterLinkGroup key={index} className='four contacts-element'>
            <FooterLink href="#">
              <img src={imgSrc} alt={`${text} type`} height={"1.75rem"} />
            </FooterLink>
            {href ? (
              <FooterLink href={href}>{text}</FooterLink>
            ) : (
              <FooterLink href="#">{text}</FooterLink>
            )}
            </FooterLinkGroup>
          ))}

          <FooterTitle title="Наши соц. сети:" className='five social-media no-text-transform' />
          {socialMedia.map(({ type, imgSrc, text, href}, index) => (
            <FooterLinkGroup key={index} className='four social-media-element'>
            <FooterLink href="#">
              <img src={imgSrc} alt={`${type} type`} height={"1.75rem"} />
            </FooterLink>
            <FooterLink href={href}>{text}</FooterLink>
            </FooterLinkGroup>
          ))}
          
        </div>
      </div>
  );
}