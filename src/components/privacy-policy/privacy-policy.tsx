import { Component, h, State } from '@stencil/core';
import content from './content.txt';
import regionData from './region-data.json';

@Component({
  tag: 'privacy-policy',
  styleUrl: 'privacy-policy.css',
  shadow: true,
})
export class PrivacyPolicy {
  @State() formData = {
    companyName: '',
    storeWebsite: '',
    emailAddress: '',
    address: '',
    city: '',
    stateProvince: '',
    zipPostalCode: '',
    countryRegion: '',
  };

  @State() filledContent = content;
  @State() showModal = false;

  handleChange(event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    this.formData = { ...this.formData, [name]: value };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.filledContent = content
        .replace(/\[Company name\]/g, `<span class="highlight">${this.formData.companyName}</span>`)
        .replace(/\[Store website\]/g, `<span class="highlight">${this.formData.storeWebsite}</span>`)
        .replace(/\[Email address\]/g, `<span class="highlight">${this.formData.emailAddress}</span>`)
        .replace(/\[Address\]/g, `<span class="highlight">${this.formData.address}</span>`)
        .replace(/\[City\]/g, `<span class="highlight">${this.formData.city}</span>`)
        .replace(/\[State\/Province\]/g, `<span class="highlight">${this.formData.stateProvince}</span>`)
        .replace(/\[Zip\/postal code\]/g, `<span class="highlight">${this.formData.zipPostalCode}</span>`)
        .replace(/\[Country\/Region\]/g, `<span class="highlight">${this.formData.countryRegion}</span>`);
      this.showModal = true;
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  handleReset() {
    this.formData = {
      companyName: '',
      storeWebsite: '',
      emailAddress: '',
      address: '',
      city: '',
      stateProvince: '',
      zipPostalCode: '',
      countryRegion: '',
    };
    this.filledContent = content;
  }

  validateForm() {
    return Object.values(this.formData).every(value => value.trim() !== '');
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.filledContent.replace(/<[^>]+>/g, ''));
    this.showModal = false;
  }

  render() {
    return (
      <div class="privacy-policy-container">
        <div class="form-container">
          <h2>Privacy Policy Generator</h2>
          {/* <p class="subtitle">Fill in your details to generate a privacy policy</p> */}

          <form onSubmit={event => this.handleSubmit(event)}>
            <div class="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                value={this.formData.companyName}
                onInput={event => this.handleChange(event)}
                required
              />
            </div>

            <div class="form-group">
              <label htmlFor="storeWebsite">Store Website</label>
              <input
                id="storeWebsite"
                type="text"
                name="storeWebsite"
                placeholder="e.g. www.yourstore.com"
                value={this.formData.storeWebsite}
                onInput={event => this.handleChange(event)}
                required
              />
            </div>

            <div class="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                type="email"
                name="emailAddress"
                placeholder="e.g. contact@yourstore.com"
                value={this.formData.emailAddress}
                onInput={event => this.handleChange(event)}
                required
              />
            </div>

            <div class="form-group">
              <label htmlFor="countryRegion">Country/Region</label>
              <select id="countryRegion" name="countryRegion" onChange={event => this.handleChange(event)} required>
                <option value="" disabled selected={!this.formData.countryRegion}>
                  Select your country/region
                </option>
                {regionData.country.map(country => (
                  <option value={country} selected={this.formData.countryRegion === country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div class="form-group">
              <label htmlFor="stateProvince">State/Province</label>
              <input
                id="stateProvince"
                type="text"
                name="stateProvince"
                placeholder="State or Province"
                value={this.formData.stateProvince}
                onInput={event => this.handleChange(event)}
                required
              />
            </div>

            <div class="form-group">
              <label htmlFor="city">City</label>
              <input id="city" type="text" name="city" placeholder="City" value={this.formData.city} onInput={event => this.handleChange(event)} required />
            </div>

            <div class="form-group">
              <label htmlFor="address">Address</label>
              <input id="address" type="text" name="address" placeholder="Street address" value={this.formData.address} onInput={event => this.handleChange(event)} required />
            </div>

            <div class="form-group">
              <label htmlFor="zipPostalCode">Zip/Postal Code</label>
              <input
                id="zipPostalCode"
                type="text"
                name="zipPostalCode"
                placeholder="Zip or Postal code"
                value={this.formData.zipPostalCode}
                onInput={event => this.handleChange(event)}
                required
              />
            </div>

            <div class="button-group">
              <button type="submit" class="btn-primary">
                Generate Policy
              </button>
              <button type="button" class="btn-secondary" onClick={() => this.handleReset()}>
                Reset Form
              </button>
            </div>
          </form>
        </div>

        <div class="content-container">
          <div class="content-header">
            <h3>Privacy Policy Preview</h3>
            <button class="copy-btn" onClick={() => this.copyToClipboard()}>
              <span class="copy-icon">📋</span> Copy to Clipboard
            </button>
          </div>
          <div class="privacy-policy-content" innerHTML={this.filledContent}></div>
        </div>

        {this.showModal && (
          <div class="modal">
            <div class="modal-content">
              <h4>Privacy Policy Generated!</h4>
              <p>Your privacy policy has been generated. Would you like to copy it to your clipboard?</p>
              <div class="modal-buttons">
                <button class="btn-primary" onClick={() => this.copyToClipboard()}>
                  <span class="copy-icon">📋</span> Copy to Clipboard
                </button>
                <button class="btn-secondary" onClick={() => (this.showModal = false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
