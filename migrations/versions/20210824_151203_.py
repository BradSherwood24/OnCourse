"""empty message

Revision ID: 8829ba9c5a39
Revises: f40832a7832c
Create Date: 2021-08-24 15:12:03.509685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8829ba9c5a39'
down_revision = 'f40832a7832c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('img', sa.String(), nullable=True))
    op.add_column('users', sa.Column('is_performance', sa.Boolean(), nullable=True))
    op.drop_column('users', 'is_performace')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'img')
    # ### end Alembic commands ###
