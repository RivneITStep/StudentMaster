using Microsoft.Extensions.Configuration;
using MimeKit;
using StudentMaster.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
namespace StudentMaster.BLL.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailAsync(string email, string subject, string message, string login, string newData)
        {

            var from = _configuration.GetSection("MailService").GetValue<string>("FROM");
            var server = _configuration.GetSection("MailService").GetValue<string>("SERVER");
            var port = _configuration.GetSection("MailService").GetValue<int>("PORT");
            var useSsl = _configuration.GetSection("MailService").GetValue<bool>("UseSSL");
            var from_email = _configuration.GetSection("MailService").GetValue<string>("EMAIL");
            var from_email_password = _configuration.GetSection("MailService").GetValue<string>("PASSWORD");
            var email_msg_footer = _configuration.GetSection("MailService").GetValue<string>("EMAIL_FOOTER");
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(from, from_email));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {



                Text = $@"<div id=':md' class='a3s aXjCH '><u></u>
    
    
    
    
<div>
    <table style='max-width:550px' align='center'>
        <tbody>
            <tr>
                <td>
                    <table style='background-color:rgb(19,19,21);width:100%'>
                        <tbody>
                        <tr>
                            <th style='background-color:rgb(19,19,21);padding:16px'>
                                <table>
                                    <tbody><tr>
                                        <th>
                                            
                                        </th>
                                        <th></th>
                                    </tr>
                                </tbody></table>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    <table style='background-color:rgb(38,50,56);width:100%'>
                        <tbody>
                        <tr>
                            <th style='padding:16px'>
                                <table>
                                    <tbody><tr>
                                        <th>
                                            <p style='text-align:left;font-weight:normal;margin-top:20px;font-family:Helvetica,Arial;font-size:28px;color:rgb(255,255,255)'>
                                                Hello, <strong>{login}!</strong>
                                            </p>
                                        </th>
                                        <th></th>
                                    </tr>
                                </tbody></table>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    
                    <table style='text-align:center; width:100%;background-color:rgb(189,189,189)'>
                        <tbody>
                        <tr>
                            <th style='text-align:center; width:100%; background-color:rgb(189,189,189);padding:16px'>
                                <table style='width:100%; text-align:center;'>
                                    <tbody style='width:100%; text-align:center;'><tr style='width:100%; text-align:center;'>
                                        <th style='width:100%; text-align:center;'>
                                            <p style='width: 100%;text-align:center;font-weight:normal;font-size:24px;color:rgb(97,97,97);margin-top:20px;margin-bottom:0'>
                                                <strong style='width:100%; text-align:center;'>{message} <span  style='text-align:left;font-weight:600;font-family:Helvetica,Arial;font-size:24;color:rgb(60,119,140)'>{newData}</span></strong>
                                            </p>
                                            <p style='width: 100%;text-align:center;font-weight:normal;font-size:24px;color:rgb(97,97,97);margin-top:1rem;margin-bottom:0'>
                                              <strong style='width:100%; text-align:center; font-size: 18px;'>{DateTime.Now.ToLongDateString()}</strong>
                                          </p>
                                        </th>
                                    </tr>
                                </tbody></table>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                    
                    <table style='width:100%;background-color:rgb(189,189,189)'>
                        <tbody>
                            <tr>
                                <th style='padding:16px'>
                                    <table>
                                        <tbody><tr>
                                            <th>
                                                <hr style='height:0;margin-bottom:20px;border:none;border-top:solid 2px rgb(59,119,139)'>
                                                <p style='text-align:left;font-weight:normal;font-size:16px;color:rgb(97,97,97)'>
                                                   This is an automatically generated message. Please do not reply. 
                                                   
                                                 
                                                </p>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </tbody></table>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <table style='background-color:rgb(19,19,21);width:100%'>
                        <tbody>
                        <tr>
                            <th style='background-color:rgb(19,19,21);padding:16px'>
                                <table>
                                    <tbody><tr>
                                        <th>
                                            <p style='text-align:left;font-weight:normal;font-family:Helvetica,Arial;font-size:12px;color:rgb(72,124,144);margin-top:20px'>
                                              {email_msg_footer}
                                            </p>
                                        </th>
                                        <th></th>
                                    </tr>
                                </tbody></table>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><div class='yj6qo'></div><div class='adL'>
</div></div><div class='adL'>
</div></div>"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(server, port, useSsl);
                await client.AuthenticateAsync(from_email, from_email_password);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
