There are a couple of changes to the isolate form we need to make. First in our field it is the normal convention to write out the mutations in a very specific way. The more recent mutation is always added to the right. When a complement is done it is shown  in the notation rules:
---
1. Genes vs. Proteins
In fungi, genes are designated in italicized lowercase, e.g. pacC.  Proteins are not italicized, first letter is capitalized, e.g. PacC.  Note, however, that each genus is a little different in how many letters are capitalized.  In Aspergillus species, only the first letter of the protein name is capitalized.  But if you look at Saccharomyces cerevisiae, the genes are italicized but they are in capital letters if WT (e.g. LEU2) and lowercase if a recessive mutation (leu2).  The proteins are not italicized but only the first letter is capitalized (Leu2).  So you need to search a little bit to understand what nomenclature is used by what fungus.  I regret to tell you that these rules are not always followed with resulting confusion in the literature.

2. Several different strains may have mutations in the same gene.  Therefore, it’s crucial to designate the specific mutation you’re working with.

Example: pacC gene

Genotype Designation of				what it means
(i) pacCC202					Constitutively active PacC
(ii) pacC::Ncpyr4	*				pacC was replaced with the Neurospora 								crassa pyr4 gene.  = delta (deletion)
							You have to read the original paper to know 								if the entire ORF was deleted or just part of 								the gene
(iii) alcAp::aflR					the aflR promoter was replaced with alcA 								promoter so that aflR is expressed by alcAp
(iv) often genes in same biosynthetic pathway will be designated by alphabet. You are familiar with this from secondary metabolite pathways, e.g. stcA, stcB, stcC, etc.  But it is true for other pathways, e.g. trpA, trpB, trpC, etc. for genes important in tryptophan metabolism.
(v) 	Individual mutants are designated by numbers: pyroA1, pyroA2, etc.  The number after the gene usually means which mutant it is. E.g.  pyrG89 is the 89th pyrG auxotroph. This holds true for old mutants of A. nidulans. It usually means the mutation was from a mutagen. You may not see this any more.
	PyrG = orotidine 5’ phosphate decarboxylase required for uridine anabolism

	* often the genotype for this type of mutant could simply be pacC::pyr4 or even pacC.  This shortened type of genotype does not tell you how pacC was deleted so you would have to read the materials and methods carefully to figure this out.

3. Velvet Gene A. nidulans only
Many of our strains are mutant at the velvet locus (veA) and designated veA1.  The wild type allele is designated veA or veA+.  This designation is sometimes forgotten when strains are added to the database, yet a considerable number of strains are wildtype at this locus, making it a critical designation.  The strain database entry form has a box specifically for identifying velvet genotype, please use it.  I will explain the history of veA at the meeting.

4. Spore Color A. nidulans
If a strain is a wildtype, green conidial spored strain, then it has no spore color genotype.  But if it is yellow spored, it is mutated at yA2 (we don’t use yA1 in the lab).  White spored strains are either wA3, or the double mutant wA3; yA2. There are other spore color mutants as well.

5.  Manipulating genes.  To understand function of a gene and its encoding protein, we can
	(i) Delete the gene.  
	(ii) Delete a domain in a gene
	(iii) Create a site mutation in a gene
	(iv) Overexpress the gene. Constitutive , induceable, on/off
	(v) Fuse a tag to a gene to see what the encoded protein interacts with in a IP study
	(vi) Fuse a fluorescent marker (GFP, RFP, etc) to see where the protein is located. But if you use a heterologous promoter, this could alter the location of the protein to some extent.
	 

6.  How we name strains in lab.
	a. If you make a fungal strain through transformation, the name is:
	T(your initials)(what number of that particular transformant event)(which transformant).  For example in the Table S4 below, the first strain is called
TFYL81.5
This means this was the 81st transformation that Fang Yun Lim did and this is the 5th isolate of that transformation. All TFYL81 strains would have the same genotype.  These are A. fumigatus strains so of course you need to say what fungus you are working with.

You need to make sure that your initials have not been taken already. It is really helpful to know who made the transformant as one can always (try) to contact that person or find their notebook if one has questions.

	b. If you do a mutagenesis, the nomenclature is identical except that you start with a M, for example

MRB230 is the 230th mutant strain that Robert Butchko made (A. nidulans, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5587912/)

	c. If you do a sexual cross (only so far we have only done in A. nidulans), the ensuing strains start with an R
For example, from the same paper, TJH3.40 and RJMP1.1 were crossed to generate progenies RAAS233.2 and RBTP69.
	TJH3.40 was an original transformant made by Julie Hicks, her 3rd transformant, #40 of that transformation.
	RJMP1.1 was first sexual cross made by Jon Palmer (He put in his middle initial), we would have to look up what were the parents.
	RAAS233.2 was the 233rd sexual cross made by Ali Soukup (middle initial)
	RBTP69 was the 69th sexual cross made by Brandon Pfannenstiel
 

7. General information on Aspergillus nidulans strains and genes
http://www.fgsc.net/Aspergillus/asperghome.html

Lets go through what genotype means below, this is from Nick’s thesis:
Table S4. A. fumigatus strains used in this study.
---
I would like to give information to the labs filling out the form that we are having them fill it out as boxes that they choose from to minimize the chance of typos to other data entering mistakes that could mess up downstream pipelines. I would also like the form to have a built in way of displaying the written version of the genotype back to the user in a way that allows them to move around the order of each genetic mutation subcomponent. For example maybe the program shows them Δku, ΔpyrG::mluc. But really the pyrG was done before the ku mutation. They show be able to drag the order in a user friendly way to alter the ordering of the genes listed. The person making the form should be clearly told to change the order to the way they write the genotype in their lab using the conventional *A. fumigatus* genotype where the newest mutations the rightmost on the list.
