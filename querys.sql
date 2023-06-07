-- Obtiene la información de la tarjeta que pernece al juego de tablones
select pc.cardSlug ,c.name , c.num as 'num_card' , p.num as 'num_plank', p.creationKey
from `plank-cards` pc
inner join plank p on pc.plankId = p.id and p.creationKey =${creationKey:string}
inner join card c on c.slug = pc.cardSlug;


--Obtiene la cantidad de tablones por llave
select COUNT(p.creationKey) as 'total_planks', p.creationKey  
from plank p 
group by p.creationKey;


--Crear las cartas directamente en la BD
INSERT INTO loteria.card
(name, slug, num)
VALUES('El gallo', 'el_gallo', 1),
('El diablo', 'el_diablo', 2),
('La dama', 'la_dama', 3),
('El catrin', 'el_catrin', 4),
('El paraguas', 'el_paraguas', 5),
('La sirena', 'la_sirena', 6),
('La escalera', 'la_escalera', 7),
('La botella', 'la_botella', 8),
('El barril', 'el_barril', 9),
('El arbol', 'el_arbol', 10),
('El melon', 'el_melon', 11),
('El valiente', 'el_valiente', 12),
('El gorrito', 'el_gorrito', 13),
('La muerte', 'la_muerte', 14),
('La pera', 'la_pera', 15),
('La bandera', 'la_bandera', 16),
('El bandolón', 'el_bandolón', 17),
('El violoncello', 'el_violoncello', 18),
('La garza', 'la_garza', 19),
('El pajaro', 'el_pajaro', 20),
('La mano', 'la_mano', 21),
('La bota', 'la_bota', 22),
('La luna', 'la_luna', 23),
('El cotorro', 'el_cotorro', 24),
('El negrito', 'el_negrito', 26),
('El corazón', 'el_corazón', 27),
('La sandia', 'la_sandia', 28),
('El tambor', 'el_tambor', 29),
('El camaron', 'el_camaron', 30),
('Las jaras', 'las_jaras', 31),
('El borracho', 'el_borracho', 25),
('El musico', 'el_musico', 32),
('La araña', 'la_araña', 33),
('El soldado', 'el_soldado', 34),
('La estrella', 'la_estrella', 35),
('El cazo', 'el_cazo', 36),
('El mundo', 'el_mundo', 37),
('El apache', 'el_apache', 38),
('El alacran', 'el_alacran', 40),
('El nopal', 'el_nopal', 39),
('La calavera', 'la_calavera', 42),
('La campana', 'la_campana', 43),
('La rosa', 'la_rosa', 41),
('El cantarito', 'el_cantarito', 44),
('El venado', 'el_venado', 45),
('El sol', 'el_sol', 46),
('La corona', 'la_corona', 47),
('El pino', 'el_pino', 49),
('La chalupa', 'la_chalupa', 48),
('El pescado', 'el_pescado', 50),
('La palma', 'la_palma', 51),
('La maceta', 'la_maceta', 52),
('El arpa', 'el_arpa', 53),
('La rana', 'la_rana', 54);