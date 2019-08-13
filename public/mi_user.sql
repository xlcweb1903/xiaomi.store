#设置客户端连接服务器编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS xiaomi;
#创建数据库xiaomi,设置存储的编码
CREATE DATABASE xiaomi CHARSET=UTF8;
#进入该数据库
USE xiaomi;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xiaomi`
--

-- --------------------------------------------------------

--
-- 表的结构 `mi-user`
--

CREATE TABLE `mi_user` (
  `uid` int(11) PRIMARY KEY AUTO_INCREMENT,
  `uname` varchar(12) NOT NULL,
  `upwd` varchar(12) NOT NULL,
  `phone` varchar(11)
);

--
-- 转存表中的数据 `mi-user`
--

INSERT INTO `mi_user` VALUES
(1, 'dingding', md5(123456), '13256465498'),
(2, 'dangdang', md5(1234567), '18702720440'),
(3, 'xielogcheng', md5(199211), '18702720440'),
(4, 'wangxiaoquan', md5(12345678), '18732131231');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
CREATE TABLE `mi_product_list` (
  `pid` int(11) PRIMARY KEY AUTO_INCREMENT,
  `pname` varchar(20) NOT NULL,
  `pdetail` varchar(150) NOT NULL,
  `price`   decimal(8),
  `picture` varchar(100) NOT NULL,
  `color`  varchar(50) NOT null,
  `space`  varchar(100) NOT NULL,
  `space_price` varchar(20) NOT NULL,
  `combo` varchar(20) NOT NULL
);

--
-- 转存表中的数据 `mi-user`
--

INSERT INTO `mi_product_list` VALUES
(1, 'Redmi K20 Pro', '「6GB+64GB 限时优惠200元，购机享分期6期免息」|骁龙855旗舰处理器 / 索尼4800万超广角三摄 / 前置2000万升降式相机 / 6.39"AMOLED全面屏 / 4000mAh超长续航 / 8层石墨立体散热 / 第七代屏下指纹解锁 / 多功能NFC', '2299','detail.img/1.jpg','冰川蓝|碳纤黑|火焰红','8GB+256GB|8GB+128GB|6GB+128GB|6GB+64GB','2999|2799|2599|2499','标配|27w快充'),
(2, 'Redmi K20', '「6GB+64GB、6GB+128GB版本赠送耳机，购机享分期6期免息，可选小米手环4 NFC版套装」|索尼4800万超广角三摄 / 骁龙730处理器 / 前置2000万升降式相机 / 6.39"AMOLED全面屏 / 4000mAh超长续航 / 第七代屏下指纹解锁 / 多功能NFC', '2099','detail.img/2.jpg','冰川蓝|火焰红|碳纤黑','6GB+128GB|6GB+64GB|8GB+256GB','2099|1999|2599','标配|27w快充'),
(3, 'Redmi Note 7', '「Redmi Note 7 6GB+64GB 闪降200元，到手价1199元，购机享3期免息，可选+10元得18W快充」|4800万拍照千元机 / “满血版”骁龙660处理器 / 品质“小金刚”，18个月超长质保 / 4000mAh 大电量 / 6.3" 水滴全面屏 / USB-C 接口，方便耐用 / 支持快充 4 协议', '1099','detail.img/3.jpg','冰川蓝|火焰红|碳纤黑','6GB+64GB|4GB+64GB|3GB+32GB','1299|1199|999','标配|+10元得18w快充'),
(4, 'Redmi Note 7 Pro', '「闪降200元，到手价1399元！购机可享3期免息！」|索尼4800万超清拍照 / 6GB+128GB大存储 / 骁龙675处理器 / 4000mAh大电量 / 18个月超长质保 / 6.3"水滴屏 / P2i整机防泼溅处理 / 标配18W充电器 / 德国莱茵 TÜV 认证护眼屏', '1399','detail.img/4.jpg','梦幻蓝|亮黑色|暮光金','6GB+64GB|4GB+64GB|3GB+32GB','1299|1199|999','标配|+10元得18w快充');