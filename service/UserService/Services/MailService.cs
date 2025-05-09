using System.Net;
using System.Net.Mail;

namespace UserService.Services
{ 
public class MailService
{
    private readonly IConfiguration _configuration;

    public MailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var smtpConfig = _configuration.GetSection("Smtp");
        var client = new SmtpClient(smtpConfig["Host"])
        {
            Port = int.Parse(smtpConfig["Port"]),
            Credentials = new NetworkCredential(smtpConfig["Username"], smtpConfig["Password"]),
            EnableSsl = bool.Parse(smtpConfig["EnableSsl"])
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(smtpConfig["Username"]),
            Subject = subject,
            Body = body,
            IsBodyHtml = false
        };

        mailMessage.To.Add(toEmail);
        await client.SendMailAsync(mailMessage);
    }
}
}