using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;

namespace StudentMaster.BLL.Helpers
{
    public static class ImageHelper
    {
        public static Bitmap FromBase64StringToImage(this string base64String)
        {
            byte[] byteBuffer = Convert.FromBase64String(base64String);
            try
            {
                using (MemoryStream memoryStream = new MemoryStream(byteBuffer))
                {
                    memoryStream.Position = 0;
                    Image imgReturn;
                    imgReturn = Image.FromStream(memoryStream);
                    memoryStream.Close();
                    byteBuffer = null;
                    return new Bitmap(imgReturn);
                }
            }
            catch { return null; }

        }

        public static Bitmap CompressImage(Bitmap originalPic, int maxWidth, int maxHeight)
        {
            try
            {
                int width = originalPic.Width;
                int height = originalPic.Height;
                int widthDiff = width - maxWidth;
                int heightDiff = height - maxHeight;
                bool doWidthResize = (maxWidth > 0 && width > maxWidth && widthDiff > heightDiff);
                bool doHeightResize = (maxHeight > 0 && height > maxHeight && heightDiff > widthDiff);

                if (doWidthResize || doHeightResize || (width.Equals(height) && widthDiff.Equals(heightDiff)))
                {
                    int iStart;
                    Decimal divider;
                    if (doWidthResize)
                    {
                        iStart = width;
                        divider = Math.Abs((Decimal)iStart / maxWidth);
                        width = maxWidth;
                        height = (int)Math.Round((height / divider));
                    }
                    else
                    {
                        iStart = height;
                        divider = Math.Abs((Decimal)iStart / maxHeight);
                        height = maxHeight;
                        width = (int)Math.Round(width / divider);
                    }
                }
                using (Bitmap outBmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
                {
                    using (Graphics oGraphics = Graphics.FromImage(outBmp))
                    {
                        //oGraphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
                        //oGraphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                        oGraphics.DrawImage(originalPic, 0, 0, width, height);

                        //Font font = new Font("Arial", 20);
                        //Brush brash = new SolidBrush(Color.Blue);
                        //oGraphics.DrawString("StudentMaster", font, brash, new Point(25, 25));
                        return new Bitmap(outBmp);
                    }
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
