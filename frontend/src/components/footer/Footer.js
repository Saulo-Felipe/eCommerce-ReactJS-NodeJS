import React from 'react'
import './S-Footer.css'

// Images
import mastercard from './images/mastercard.png'
import visacard from './images/visacard.png'
import paypal from './images/paypalcard.png'
import americancard from './images/americancard.png'
import boleto from './images/boleto.png'
import eloCard from './images/elocard.png'
import hipercard from './images/hipercard.png'


export default function Footer() {
	return (
		<footer>
			<div className="footer-content">
				<div className="container">
					<h5 className="mt-2 mb-2 align-center mt-2 mb-4">Aceitamos as principais formas de pagamento.</h5>
					<div className="footer-card-icons row ">					
						<abbr title="Visa" className="col"><img className="footer-card-icon" src={ visacard } alt="VisaCard" /></abbr>
						<abbr title="Mastercard" className="col"><img className="footer-card-icon" src={ mastercard } alt="MasterCard" /></abbr>
						<abbr title="Paypal" className="col"><img className="footer-card-icon" src={ paypal } alt="Paypal" /></abbr>
						<abbr title="EloCard" className="col"><img className="footer-card-icon" src={ eloCard } alt="EloCard" /></abbr>
						<abbr title="AmericanCard" className="col"><img className="footer-card-icon" src={ americancard } alt="AmericanCard" /></abbr>
						<abbr title="Boleto Bancário" className="col"><img className="footer-card-icon" src={ boleto } alt="Boleto" /></abbr>
						<abbr title="HiperCard" className="col"><img className="footer-card-icon" src={ hipercard } alt="HiperCard" /></abbr>
					</div>
				</div>
				<div className="footer-divisions d-flex flex-row">
					<div className="footer-contact">
						<h5 className="mb-3">Redes sociais</h5>
						<div className="social-media-paragraph">
							<div className="footer-social-media-icon"><i className="fab fa-instagram fa-lg"></i> Instagram</div>
							<div className="footer-social-media-icon"><i className="fab fa-facebook fa-lg"></i> Facebook</div>
							<div className="footer-social-media-icon"><i className="fab fa-tiktok"></i> TikTok</div>
							<div className="footer-social-media-icon"><i className="fab fa-twitter"></i> Twitter</div>
							<div className="footer-social-media-icon"><i className="fab fa-youtube"></i> YouTube</div>
							<div className="footer-social-media-icon"><i className="fab fa-github fa-lg"></i> Github</div>
						</div>
					</div>
					<span className="span-border-right"></span>
					<div></div>
					<div></div>
				</div>
			</div>
			<div className="footer-end">© Saulo Felipe</div>
		</footer>
	)
}